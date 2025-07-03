import { useStoreActions, useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

const useValidateDirtyForm = () => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const serIsDirtyForm = useStoreActions((state) => state.isDirtyForm.setIsDirtyForm)
  const { isDirtyForm } = useStoreState((state) => state.isDirtyForm)
  const navigate = useNavigate()
  const validateDirtyForm = (path) => {
    if (isDirtyForm) {
      setConfirmAlertProps({
        open: true,
        icon: 'warning',
        title: '¿Desea salir del sitio?',
        content: 'Es posible que los cambios que se implementaron no se puedan guardar.',
        onConfirm: () => {
          serIsDirtyForm(false)
          navigate(path)
        },
      })
    } else {
      navigate(path)
    }
  }

  return validateDirtyForm
}

export default useValidateDirtyForm
