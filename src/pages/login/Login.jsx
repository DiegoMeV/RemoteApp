import { ViewLogin } from './views'
import { useForm } from 'react-hook-form'
import { useAuthUserLogin, useClearSessionAzure, useMagicLinkLogin, useSiifWebLogin } from './funcs'

import { useRef, useState } from 'react'
import toast from 'react-hot-toast'
import { authVar, useBoolean, useMutationDynamicBaseUrl } from '@/lib'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const recaptchaRef = useRef(null)
  const [magicLink, setMagicLink] = useState(false)
  const [loginSiif, setLoginSiif] = useState(false)
  const navigate = useNavigate()
  const twoFactorModal = useBoolean()
  // Clear session azure
  useClearSessionAzure()

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

  const onSuccessLogin = () => {
    if (authVar.twoFactor) {
      getKeyAuth()
      twoFactorModal.handleShow()
      return
    }
    navigate('/selectCompany')
  }

  // Auth user and get info user
  const { login, loadingPushLogin } = useAuthUserLogin(onSuccessLogin)

  // Auth user by SIIFWEB
  const { loginSiifWeb, loadingSiifWeb } = useSiifWebLogin(onSuccessLogin)

  // Auth user by magic link
  const { loginMagicLink, loadingMagicLink } = useMagicLinkLogin()

  // Handle magic link submit
  const handleMagicLinkSubmit = (data) => {
    const captchaToken = recaptchaRef.current.getValue()

    if (!captchaToken) {
      toast.error('Por favor, complete la verificación de seguridad.')
      return
    }

    loginMagicLink({ ...data, captchaToken })
  }

  // Form login
  const formLogin = useForm()
  const onSubmit = (data) => {
    if (magicLink) return handleMagicLinkSubmit(data)
    if (loginSiif) return loginSiifWeb(data)
    login(data)
  }

  const props = {
    formLogin,
    onSubmit,
    loading: loadingPushLogin || loadingMagicLink || loadingSiifWeb || isPendingKeyAuth,
    magicLink,
    setMagicLink,
    loginSiif,
    setLoginSiif,
    recaptchaRef,
  }
  return <ViewLogin {...props} />
}

export default Login
