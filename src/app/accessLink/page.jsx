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
  TwoFactorModal,
} from '@/lib'
import { useTwoFactorModalClose } from '@/lib/components/TwoFactorAuth'
import { useNavigate, useSearchParams } from 'react-router-dom'

const AccessLink = () => {
  // Get URL query parameters
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const twoFactorModal = useBoolean()
  const { setTokenData } = useStoreActions((actions) => actions.token)
  const handleCloseTwoFactorModal = useTwoFactorModalClose(twoFactorModal)

  // Get token and error message from query parameters
  const token = searchParams.get('token')
  const messageError = searchParams.get('message')

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
    let timeoutId
    // The timeOut is only additional, for one test
    if (token) {
      timeoutId = setTimeout(() => {
        setTokenData({ token: token })
        if (authVar.twoFactor) {
          getKeyAuth()
          twoFactorModal.handleShow()
          return
        }
        navigate('/selectCompany')
      }, 1500)
    } else {
      // If a token was not received, it displays an error message (if present).
      toast.error(messageError ?? MagicString.LOGIN.LOGIN_ERROR)
      navigate('/')
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId) // Cleaning timeout when disassembling or changing dependencies
      }
    }
  }, [token, navigate, setTokenData, messageError, getKeyAuth, twoFactorModal])

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

export default AccessLink
