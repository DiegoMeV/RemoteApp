import { useBoolean } from '@/lib'
import ModalGeneration from './ModalGeneration'
import OptionsGeneration from './OptionsGeneration'
import {
  BackdropLoading,
  ElementContainer,
  GenericFields,
  useMutationDynamicBaseUrl,
} from '@/libV4'
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
  dataManagement,
}) => {
  const [idProcess, idActivity] = ids || []

  const modalActions = useBoolean()

  const [elementActionLocal, setElementActionLocal] = useState({})

  const fields = generationFields(elementActionLocal)

  useEffect(() => {
    if (elementAction) {
      setElementActionLocal(elementAction)
    }
  }, [elementAction])

  const { mutateAsync: performAction, isPending: updatingItemAction } = useMutationDynamicBaseUrl({
    baseKey: 'urlProcess',
    url: `/processes/${idProcess}/activities/${idActivity}/items-to-perform/${idAction}`,
    method: 'get',
    onSuccess: (response) => {
      setElementActionLocal(response?.data?.[0])
    },
    onError: () => {
      refetchElementActions()
    },
  })

  const onSuccessAditional = async (response) => {
    performAction({ qry: `?idTaskActionItem=${response?.data?.[0]?.idTaskActionItem}` })
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
        refetchElementActions={refetchElementActions}
        onSuccessAditional={onSuccessAditional}
        dataManagement={dataManagement}
      />
    </ElementContainer>
  )
}

export default ElementGeneration
