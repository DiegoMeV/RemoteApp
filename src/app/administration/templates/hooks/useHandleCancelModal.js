import { useStoreActions } from 'easy-peasy'
import { useCallback } from 'react'

const useHandleCancelModal = ({ modalUploadTemplate, form, setVersionInfo }) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleCancelModal = useCallback(() => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Va a cancelar la carga de la plantilla',
      content: null,
      onConfirm: () => {
        modalUploadTemplate.handleShow()
        form.unregister()
        setVersionInfo(null)
      },
    })
  }, [setConfirmAlertProps, modalUploadTemplate, form, setVersionInfo])

  return { handleCancelModal }
}
export default useHandleCancelModal
