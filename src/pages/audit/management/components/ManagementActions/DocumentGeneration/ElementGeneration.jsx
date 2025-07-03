import { useBoolean, useMutationDynamicBaseUrl } from '@/lib'
import ModalGeneration from './ModalGeneration'
import OptionsGeneration from './OptionsGeneration'
import { BackdropLoading, ElementContainer, GenericFields } from '@/libV4'
import { generationFields } from './funcs'
import { useOptionsGeneration } from './hooks'
import { useEffect, useState } from 'react'

const ElementGeneration = ({
  idAction,
  elementAction,
  idTaskAction,
  idActivityAction,
  ids,
  refetchElementActions,
}) => {
  const [idProcess, idActivity] = ids || []

  const [elementActionLocal, setElementActionLocal] = useState({})
  const [idTaskActionItem, setIdTaskActionItem] = useState('')
  useEffect(() => {
    if (elementAction) {
      setElementActionLocal(elementAction)
    }
  }, [elementAction])

  const fields = generationFields(elementActionLocal)
  const modalActions = useBoolean()

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
    },
  })

  const onSuccessAditional = async (response) => {
    await setIdTaskActionItem(
      response?.data?.idTaskActionItem ?? response?.data?.[0]?.idTaskActionItem
    )
    performAction()
  }

  const { handleCancelDocument, isPending } = useOptionsGeneration(
    elementActionLocal,
    idActivityAction,
    onSuccessAditional
  )

  return (
    <ElementContainer
      isRequired={elementActionLocal?.isRequired}
      className='relative'
    >
      <BackdropLoading loading={isPending} />
      <BackdropLoading
        loading={updatingItemAction}
        sizeLoading={80}
        sx={{
          position: 'absolute',
          borderRadius: '5px',
          zIndex: 1,
        }}
      />
      <GenericFields fields={fields} />
      <OptionsGeneration
        elementAction={elementActionLocal}
        handleShow={modalActions.handleShow}
        handleCancelDocument={handleCancelDocument}
      />
      <ModalGeneration
        elementAction={elementActionLocal}
        modalActions={modalActions}
        idTaskAction={idTaskAction}
        idActivityAction={idActivityAction}
        ids={ids}
        onSuccessAditional={onSuccessAditional}
      />
    </ElementContainer>
  )
}

export default ElementGeneration
