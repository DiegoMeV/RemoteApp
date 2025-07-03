import { BackdropLoading, GenericForm, useMutationDynamicBaseUrl } from '@/lib'
import { Box, Grid } from '@mui/material'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const PayOrdersApproval = (props) => {
  const { processInfo, elementData } = props
  const form = useForm()
  const callApiUrl = elementData?.[0]?.callAPIURL ?? null

  useEffect(() => {
    const payOrderData = processInfo?.[0]?.processData?.payOrderData

    if (payOrderData) {
      Object.keys(payOrderData).forEach((key) => {
        form.setValue(key, payOrderData[key])
      })
    }
  }, [form, processInfo])

  const { mutateAsync: aprovePayOrder, isPending: isPendingPayOrder } = useMutationDynamicBaseUrl({
    url: callApiUrl,
    isCompanyRequest: true,
    enabled: !!callApiUrl,
    onSuccess: () => {
      toast.success('Orden de pago aprobada')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al aprobar orden de pago')
    },
  })
  const onSubmit = async (data) => {
    if (callApiUrl) {
      aprovePayOrder({ body: { approvalDate: data?.approvalDate } })
      return
    }
    toast.error('No se encontró la url para aprobar la orden de pago')
  }

  const inputsList = [
    {
      name: 'prefijo',
      type: 'text',
      space: 4,
      label: 'Prefijo',
      disabled: true,
    },
    {
      name: 'nrodoc',
      type: 'text',
      space: 4,
      label: 'Numero de orden de pago',
      disabled: true,
    },
    {
      name: 'fecha',
      type: 'date',
      space: 4,
      label: 'Fecha orden',
      disabled: true,
    },
    {
      name: 'valor',
      type: 'money',
      space: 4,
      label: 'Valor',
      disabled: true,
    },
    {
      name: 'terceroType',
      type: 'text',
      space: 4,
      label: 'Tipo tercero',
      disabled: true,
    },

    {
      name: 'tercero',
      type: 'text',
      space: 4,
      label: 'Tercero',
      disabled: true,
    },
    {
      name: 'nombreCompletoTercero',
      type: 'text',
      space: 4,
      label: 'Nombre tercero',
      disabled: true,
    },
    {
      name: 'approvalDate',
      type: 'date',
      space: 4,
      label: 'Fecha de aprobacion',
      disableFuture: true,
      validate: (value) => {
        if (value > new Date()) {
          return 'No puede ser mayor a la fecha actual'
        }
        return true
      },
    },
    {
      type: 'button',
      children: 'Aprobar orden',
      space: 4,
      typeButton: 'submit',
    },
  ]
  return (
    <Box
      p={2}
      bgcolor={'backgroundWhite1'}
      borderRadius={3}
      display='flex'
      flexDirection='column'
      gap={2}
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
    >
      {isPendingPayOrder ?? <BackdropLoading loading={isPendingPayOrder} />}
      {
        // TODO : download pay order by docs
        /* <Button
        variant='outlined'
        color='secondary'
        sx={{ width: '20%', alignSelf: 'flex-end', boxShadow: 3 }}
        endIcon={
          <img
            style={{ width: '25px', height: '25px' }}
            src='/assets/svg/PDF.svg'
            alt='PDF'
          />
        }
      >
        Orden Pago
      </Button> */
      }
      <Grid
        container
        spacing={2}
        justifyContent='flex-end'
      >
        <GenericForm
          inputs={inputsList}
          control={form?.control}
        />
      </Grid>
    </Box>
  )
}

export default PayOrdersApproval
