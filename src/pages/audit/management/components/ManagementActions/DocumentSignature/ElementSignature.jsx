import { useEffect, useState } from 'react'
import { ElementContainer, CustomTextfield } from '..'
import { conditionRenderOptions, fieldValues } from '../funcs'
import OptionsSignature from './OptionsSignature'
import { useMutationDynamicBaseUrl } from '@/libV4'
import toast from 'react-hot-toast'
import { BackdropLoading } from '@/lib'

const ElementSignature = ({
  idAction,
  elementAction,
  ids,
  refetchManagement,
  idActivityAction,
  refetchElementActions,
}) => {
  const [elementActionLocal, setElementActionLocal] = useState({})
  const [idTaskActionItem, setIdTaskActionItem] = useState('')

  const [idProcess, idActivity] = ids

  useEffect(() => {
    if (elementAction) {
      setElementActionLocal(elementAction)
    }
  }, [elementAction])

  const disabledReview =
    elementActionLocal?.activityActionItemData?.documentData?.status === 'RECHAZADO'

  const renderOptions = conditionRenderOptions(elementActionLocal)

  const { type, generationDate, status, documentName } = fieldValues(elementActionLocal)

  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    onSuccess: (response) => {
      const newData = response?.data?.find((element) => element?.id === idTaskActionItem)
      setElementActionLocal(newData)
    },
    onError: () => {
      refetchElementActions()
      refetchManagement()
    },
  })

  const { mutateAsync: reviewDocument, isPending: reviewingDocument } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
    url: `/processes/activity-actions`,
    onSuccess: async (response) => {
      await setIdTaskActionItem(response?.data?.idTaskActionItem)
      performAction()
      toast.success('Documento actualizado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Error al revisar documento')
    },
  })

  return (
    <ElementContainer
      isRequired={elementActionLocal?.isRequired ?? false}
      sx={{
        position: 'relative',
      }}
    >
      <BackdropLoading
        loading={reviewingDocument || updatingItemAction}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <CustomTextfield
        lg={3}
        label='Tipo'
        value={type}
      />
      <CustomTextfield
        lg={3}
        label='Nombre del documento cargado'
        value={documentName}
      />
      <CustomTextfield
        lg={3}
        label='Fecha de generación'
        value={generationDate}
      />
      <CustomTextfield
        lg={3}
        label='Estado'
        value={status}
      />
      {renderOptions && (
        <OptionsSignature
          elementActionLocal={elementActionLocal}
          idActivityAction={idActivityAction}
          currentState={elementActionLocal?.activityActionItemData?.documentData?.status}
          disabledReview={disabledReview}
          reviewDocument={reviewDocument}
        />
      )}
    </ElementContainer>
  )
}

// elementActionLocal,
// idActivityAction,
// currentState,
// disabledReview,
// reviewDocument,

export default ElementSignature
