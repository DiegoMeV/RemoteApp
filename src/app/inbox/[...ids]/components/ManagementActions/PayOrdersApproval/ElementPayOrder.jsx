import { BackdropLoading, BasicTitle, GenericDate, GenericFields } from '@/libV4'
import { useMutationDynamicBaseUrl } from '@/lib'
import { Button } from '@mui/material'
import { inputsForPayOrder } from './funcs'
import { useState } from 'react'
import dayjs from 'dayjs'
import toast from 'react-hot-toast'

const ElementPayOrder = ({
  item,
  callApiUrl,
  elementData,
  ids,
  idAction,
  refetchElementActions,
}) => {
  const [idProcess, idActivity] = ids || []
  const [elementDataLocal, setElementDataLocal] = useState(elementData)

  const element = elementDataLocal?.[0]?.allActivityActionItems?.find(
    (element) => element?.actionItemData?.payOrderApprovalData?.tipo === item.data?.tipo
  )

  const initialApprovalDate = element?.actionItemData?.payOrderApprovalData?.fechaAprobacion ?? ''

  const tipo = element?.actionItemData?.payOrderApprovalData?.tipo ?? ''

  const existInitialApprovalDate = initialApprovalDate != ''

  const [approvalDate, setApprovalDate] = useState(initialApprovalDate)

  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    onSuccess: (response) => {
      setElementDataLocal(response?.data)
    },
    onError: () => {
      refetchElementActions()
    },
  })

  const { mutateAsync: aprovePayOrder, isPending: isPendingPayOrder } = useMutationDynamicBaseUrl({
    url: callApiUrl,
    isCompanyRequest: true,
    enabled: !!callApiUrl,
    onSuccess: () => {
      toast.success('Orden de pago aprobada')
      performAction()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al aprobar orden de pago')
    },
  })

  const { mutateAsync: changePayOrderState, isPending: changingPayOrderState } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlProcess',
      url: `/apps-specific/contracts/pay-order-in-progress/${idProcess}/${idActivity}/${element?.idTaskActionItem}/${tipo}`,
      isCompanyRequest: true,
      onSuccess: () => {
        toast.success('Estado de orden de pago cambiado a vigente')
        performAction()
        setApprovalDate('')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al aprobar orden de pago')
      },
    })

  const onSubmit = async ({ qry }) => {
    if (callApiUrl) {
      aprovePayOrder({ body: { approvalDate }, qry })
      return
    }
    toast.error('No se encontró la url para aprobar la orden de pago')
  }

  return (
    <div className='relative'>
      <BackdropLoading
        loading={isPendingPayOrder || updatingItemAction || changingPayOrderState}
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <BasicTitle title={item.title} />
      <div className='general_form_container p-2 backgroundGray1'>
        <GenericFields fields={inputsForPayOrder(item.data)} />
        <GenericDate
          className='xs:col-span-12 lg:col-span-4'
          label='Fecha de aprobación'
          value={approvalDate}
          disabled={existInitialApprovalDate}
          onChange={(value) => {
            if (value) setApprovalDate(dayjs(value))
          }}
          slotProps={{
            textField: {
              size: 'small',
              helperText:
                approvalDate != '' && dayjs(approvalDate) > dayjs(new Date())
                  ? 'No puede ser mayor a la fecha actual'
                  : '',
            },
          }}
          disableFuture={true}
        />
        <div className='xs:col-span-12 lg:col-span-4'>
          <Button
            onClick={() => onSubmit({ qry: `/${item?.data?.tipo}` })}
            fullWidth
            variant='contained'
            disabled={existInitialApprovalDate}
          >
            Aprobar orden
          </Button>
        </div>
        <div className='xs:col-span-12 lg:col-span-4'>
          <Button
            onClick={() => changePayOrderState()}
            fullWidth
            variant='contained'
            disabled={!existInitialApprovalDate}
          >
            Cambiar estado OP a Vigente
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ElementPayOrder
