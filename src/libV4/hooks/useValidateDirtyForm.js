import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../store'

const useValidateDirtyForm = () => {
  const { setConfirmAlertProps, serIsDirtyForm, isDirtyForm } = useRootStore()

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
