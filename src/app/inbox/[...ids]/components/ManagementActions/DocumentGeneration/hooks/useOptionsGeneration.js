import { useStoreActions } from 'easy-peasy'
import { useCancelAnyAction, useProcessModifyItem } from '../../hooks'

const useOptionsGeneration = (elementAction, idActivityAction, onSuccessAditional) => {
  const idDocument = elementAction?.activityActionItemData?.documentData?.id

  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const { cancelDocument, isPendingCancel } = useCancelAnyAction(idDocument)

  const { modifyItemInformation, loadingItemCreation } = useProcessModifyItem(
    idActivityAction,
    null,
    onSuccessAditional
  )

  const handleCancelDocument = async () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: '',
      content: '¿Está seguro que desea anular el documento?',
      onConfirm: async () => {
        const resCancel = await cancelDocument({ estado: 'ANULADO' })
        if (resCancel.success) {
          modifyItemInformation({
            qry: elementAction?.activityActionItemData?.id
              ? `/${elementAction?.activityActionItemData?.id ?? ''}`
              : '',
            methodBody: 'put',
            body: {
              idTaskActionItem: elementAction.id,
              idDocument: resCancel.data.id,
              idDocumentVersion: resCancel.data.especificaciones.version,
              documentStatus: resCancel.data.estado,
            },
          })
        }
      },
    })
  }
  return {
    handleCancelDocument,
    isPending: isPendingCancel || loadingItemCreation,
  }
}

export default useOptionsGeneration
