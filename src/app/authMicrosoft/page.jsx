import { useEffect } from 'react'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import {
  authVar,
  BackdropLoading,
  CustomModal,
  MagicString,
  useBoolean,
  useMutationDynamicBaseUrl,
  useTwoFactorModalClose,
} from '@/lib'
import { TwoFactorModal } from '@/lib/components/TwoFactorAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AuthMicrosoft = () => {
  // Obtener parámetros de la URL
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const twoFactorModal = useBoolean()
  const { setTokenData } = useStoreActions((actions) => actions.token)
  const setSessionAzure = useStoreActions((actions) => actions.sessionAzure.setSessionAzure)

  const handleCloseTwoFactorModal = useTwoFactorModalClose(twoFactorModal)

  // Obtener token y mensaje de error de los parámetros de la URL
  const token = searchParams.get('token')
  const messageError = searchParams.get('message')

  // Configurar un tiempo de espera común

  // Get the twoFactorModal key
  const { mutateAsync: getKeyAuth, isPending: isPendingKeyAuth } = useMutationDynamicBaseUrl({
    baseKey: 'urlUsers',
    url: '/auth/gen-2fa-code',
    method: 'POST',
    onSuccess: () => {
      toast.success('Código de verificación enviado')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  useEffect(() => {
    if (token) {
      setTokenData({ token: token })
      setSessionAzure(true)
      if (authVar.twoFactor) {
        getKeyAuth()
        twoFactorModal.handleShow()
        return
      }
      navigate('/selectCompany')
    } else {
      toast.error(messageError ?? MagicString.LOGIN.LOGIN_ERROR)
      navigate('/')
    }

    // No es necesario limpiar el timeout ya que el componente se desmontará
    // después de la navegación
  }, [token, messageError, navigate, getKeyAuth])

  return (
    <>
      {isPendingKeyAuth ? <BackdropLoading loading={isPendingKeyAuth} /> : null}
      {twoFactorModal?.show && (
        <CustomModal
          open={twoFactorModal?.show}
          title={'Verificación dos pasos'}
          handleClose={handleCloseTwoFactorModal}
          size={'md'}
        >
          <TwoFactorModal />
        </CustomModal>
      )}
    </>
  )
}

export default AuthMicrosoft
