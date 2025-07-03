import toast from 'react-hot-toast'
import {
  authVar,
  useAuthUser,
  useBoolean,
  useDefaultAuth,
  useMagicLink,
  useMutationDynamicBaseUrl,
  // usePrivileges,
  useSiifWeb,
  // useUserInfo,
} from '@/lib'
import ViewLogin from './views'
import { useEffect, useState } from 'react'
import { fisrtAuth } from './funcs'
import { useStoreActions } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
// import { arrayToObject } from '@/lib'

const Login = () => {
  const devMode = useDefaultAuth()

  const [authOption, setAuthOption] = useState({
    MAGIC_LINK: false,
    SIIFWEB: authVar?.default === 'SIIFWEB' ? true : false,
  })

  const selectOption = (option) => {
    const resetOptions = Object.keys(authOption).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {})
    if (option) {
      if (authOption?.[option]) {
        if (devMode) {
          setAuthOption({ ...resetOptions, [option]: !authOption?.[option] })
          return
        }
        setAuthOption({ ...resetOptions, [authVar?.default]: true })
        return
      }
      setAuthOption({ ...resetOptions, [option]: true })
      return
    }
    setAuthOption({ ...resetOptions, [authVar?.default]: true })
  }

  const twoFactorModal = useBoolean()
  const clearSessionAzure = useStoreActions((actions) => actions.sessionAzure.clearSessionAzure)
  // const setUserParameters = useStoreActions((state) => state.userParameter.setUserParameter)
  const navigate = useNavigate()

  // const hasPrivilegeConsole = usePrivileges('procesos.consola.analitica_personal')

  //Save user info in the store
  useEffect(() => {
    const timer = setTimeout(async () => {
      fisrtAuth(navigate, devMode)
    }, 2000)

    return () => clearTimeout(timer) // Limpiar el temporizador si el componente se desmonta
  }, [devMode, navigate])

  // const { mutateAsync: getUserParameters, isPending: isPendingUserParameters } =
  //   useMutationDynamicBaseUrl({
  //     baseKey: 'urlApps',
  //     url: '/parameters',
  //     isCompanyRequest: true,
  //     method: 'get',
  //     onSuccess: (e) => {
  //       const dataParameters = arrayToObject(e?.data, 'parametro', 'valor', 'snake')
  //       setUserParameters(dataParameters)
  //     },
  //     onError: (e) => {
  //       toast.error(e?.response?.data?.error)
  //     },
  //   })

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

  // const { mutateAsync: getInfoUser, isPending: loadingSetUserInfo } = useUserInfo({
  //   onSuccess: (response) => {
  //     const companies = response?.data?.[0]?.companies ?? []
  //     const aliases = response?.data?.[0]?.aliases
  //     if (aliases && Object.keys(aliases).length > 0) {
  //       getUserParameters()
  //     }
  //     toast.success('Inicio de sesión exitoso')
  //     if (hasPrivilegeConsole) {
  //       router.replace(companies.length > 1 ? '/selectCompany' : '/dashboard', undefined, {
  //         scroll: false,
  //       })
  //       return
  //     }
  //     router.replace('/inbox', undefined, { scroll: false })
  //   },
  //   onError: (e) => {
  //     toast.error(e?.response?.data?.error)
  //   },
  // })

  // Mutator for user login
  const { mutateAsync: login, isPending: loadingPushLogin } = useAuthUser({
    onSuccess: () => {
      if (authVar.twoFactor) {
        getKeyAuth()
        twoFactorModal.handleShow()
        return
      }
      navigate('/selectCompany')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  // Mutator for user siifWeb
  const { mutateAsync: loginSiifWeb, isPending: loadingSiifWeb } = useSiifWeb({
    onSuccess: () => {
      if (authVar.twoFactor) {
        getKeyAuth()
        twoFactorModal.handleShow()
        return
      }
      navigate('/selectCompany')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  // Mutator for user magicLink
  const { mutateAsync: loginMagicLink, isPending: loadingMagicLink } = useMagicLink({
    onSuccess: () => {
      toast.success(
        'Por favor, revise su correo electrónico para acceder al enlace de autenticación.'
      )
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error ?? 'Error al enviar el correo')
    },
  })

  useEffect(() => {
    clearSessionAzure()
  }, [clearSessionAzure])

  return (
    <ViewLogin
      groupLogin={{
        login,
        loadingPushLogin: loadingPushLogin || isPendingKeyAuth,
        twoFactorModal,
      }}
      groupSiifWeb={{ loginSiifWeb, loadingSiifWeb }}
      groupMagicLink={{ loginMagicLink, loadingMagicLink }}
      authOption={authOption}
      setAuthOption={setAuthOption}
      selectOption={selectOption}
    />
  )
}

export default Login
