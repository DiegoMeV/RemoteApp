import { BackdropLoading, CustomModal } from '@/lib'
import FormGeneration from './FormGeneration'
import { useStoreActions } from 'easy-peasy'
import { useForm } from 'react-hook-form'
import {
  adaptDataToDocumentRequest,
  getCancelAction,
  getGenerateAction,
  useDocumentFunctions,
} from './funcs'

const ModalGeneration = ({
  elementAction,
  modalActions,
  idTaskAction,
  idActivityAction,
  ids,
  onSuccessAditional,
}) => {
  const [idProcess, idActivity] = ids || []

  const idDocument = elementAction?.activityActionItemData?.documentData?.id
  const idItem = elementAction?.activityActionItemData?.id

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleClose = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '',
      content: '¿Está seguro que desea cancelar la generación?',
      onConfirm: () => modalActions.handleShow(),
    })
  }
  const form = useForm({})

  const Actions = [getCancelAction(handleClose), getGenerateAction(idDocument)]

  const updateInfo = (response) => {
    onSuccessAditional(response)
    modalActions?.handleShow()
  }

  const { generateDocument, regenerateDocument, isPending } = useDocumentFunctions(
    idDocument,
    updateInfo
  )

  const onSubmit = async (data) => {
    const body = adaptDataToDocumentRequest(data, elementAction)
    if (!idDocument) {
      await generateDocument({
        body: {
          idProcesoFiscaliza: idProcess,
          idActivity,
          idTaskActionItem: elementAction?.id,
          idActivityAction: idActivityAction,
          ...body,
        },
      })
    } else {
      await regenerateDocument({
        body: {
          idProcesoFiscaliza: idProcess,
          idActivity,
          idTaskActionItem: elementAction?.id,
          idActivityAction: idActivityAction,
          idItem: idItem,
          ...body,
        },
      })
    }
  }

  return (
    <CustomModal
      open={modalActions.show}
      handleClose={handleClose}
      modalType='form'
      onSubmit={form.handleSubmit(onSubmit)}
      title='Generación de documento'
      height='calc(100vh - 200px)'
      actions={elementAction?.templateData?.id ? Actions : []}
      size='lg'
    >
      <FormGeneration
        elementAction={elementAction}
        idTaskAction={idTaskAction}
        generationForm={form}
        ids={ids}
      />
      <BackdropLoading loading={isPending} />
    </CustomModal>
  )
}

export default ModalGeneration
