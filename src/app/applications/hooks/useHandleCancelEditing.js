import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

/**
 * Custom hook to handle cancellation of editing.
 *
 * This hook sets up a function that, when called, will display a confirmation alert.
 * If the user confirms, they will be redirected to the contracts types page.
 *
 * @returns {function} The function to call when the user wants to cancel editing.
 */

export const useHandleCancelEditing = ({ path, handleClose }) => {
  const navigate = useNavigate()
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )

  const handleCancelEditing = () => {
    setConfirmAlertProps({
      open: true,
      icon: 'warning',
      title: 'Cancelar edición',
      content: `¿Esta seguro de cancelar la edición?`,
      onConfirm: () => {
        if (path) {
          navigate(path)
        }
        if (handleClose) {
          handleClose()
        }
      },
    })
  }

  return handleCancelEditing
}
