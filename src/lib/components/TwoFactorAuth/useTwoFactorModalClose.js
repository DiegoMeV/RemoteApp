import { useCallback } from 'react'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'

export const useTwoFactorModalClose = (twoFactorModal) => {
  const clearTokenData = useStoreActions((actions) => actions.token.clearTokenData)
  const clearUserData = useStoreActions((actions) => actions.user.clearUserData)
  const clearCompanyData = useStoreActions((actions) => actions.company.clearCompanyData)
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const navigate = useNavigate()

  const handleClose = useCallback(() => {
    setConfirmAlertProps({
      open: true,
      icon: 'info',
      title: '¿Esta seguro de cerrar modal?',
      content:
        'Si cierra el modal deberá iniciar sesión nuevamente, y usar un nuevo código de verificación',
      onConfirm: () => {
        navigate('/')
        twoFactorModal.handleShow()
        clearTokenData()
        clearUserData()
        clearCompanyData()
      },
    })
  }, [
    setConfirmAlertProps,
    navigate,
    twoFactorModal,
    clearTokenData,
    clearUserData,
    clearCompanyData,
  ])

  return handleClose
}
