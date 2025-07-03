import {
  arrayToObject,
  useGetAllParams,
  useMutationDynamicBaseUrl,
  usePrivileges,
  useQueryDynamicApi,
  useUserInfo,
} from '@/lib'
import { ViewSso } from './view'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import { useStoreActions } from 'easy-peasy'
import { useEffect } from 'react'

const Sso = () => {
  // Hooks
  const { token } = useGetAllParams()
  const navigate = useNavigate()

  const setUserParameters = useStoreActions((state) => state.userParameter.setUserParameter)
  const { setTokenData } = useStoreActions((actions) => actions.token)
  const hasPrivilegeConsole = usePrivileges('procesos.consola.analitica_personal')

  // Query to fetch new token
  const {
    data: newToken,
    isFetching: isFetchingToken,
    isError,
    error,
  } = useQueryDynamicApi({
    baseKey: 'urlUsers',
    isCompanyRequest: false,
    url: `/auth/mintic/encrypted-token/${token}`,
    enabled: !!token,
  })

  // Mutation to fetch user parameters
  const { mutateAsync: getUserParameters } = useMutationDynamicBaseUrl({
    baseKey: 'urlApps',
    url: '/parameters',
    isCompanyRequest: true,
    method: 'get',
    onSuccess: (response) => {
      const dataParameters = arrayToObject(response?.data, 'parametro', 'valor', 'snake')
      setUserParameters(dataParameters)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? 'Error al obtener parámetros de usuario')
    },
  })

  // Mutation to fetch user information
  const { mutateAsync: getInfoUser } = useUserInfo({
    onSuccess: (response) => {
      const companies = response?.data?.[0]?.companies ?? []
      const aliases = response?.data?.[0]?.aliases
      if (aliases?.SIIFWEB && Object.keys(aliases).length > 0) {
        getUserParameters()
      }

      toast.success('Inicio de sesión exitoso')

      const redirectTo = hasPrivilegeConsole
        ? companies.length > 1
          ? '/selectCompany'
          : '/dashboard'
        : '/inbox'

      navigate(redirectTo)
    },
    onError: (error) => {
      toast.error(error?.response?.data?.error ?? 'Error al obtener información de usuario')
    },
  })

  // Effect to handle token response
  useEffect(() => {
    if (newToken?.success) {
      setTokenData({ token: newToken?.token })
      getInfoUser()
    } else if (isError) {
      toast.error(error?.response?.data?.error ?? 'Token no enviado')
    }
  }, [newToken, isError, error, setTokenData, getInfoUser])

  // Props to pass to the view component
  const props = {
    isFetchingToken,
    isError,
    error,
  }

  return <ViewSso {...props} />
}

export default Sso
