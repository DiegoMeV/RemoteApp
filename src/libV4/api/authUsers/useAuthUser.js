import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '../../constants'
import { useApiRequest } from '../../hooks'
import { useRootStore } from '../../store'
import { useStoreActions } from 'easy-peasy'

const useAuthUser = (queryParams) => {
  const request = useApiRequest()
  const { setTokenData } = useRootStore()
  /* TODO: Eliminar para solo utilizar zustand */
  const setTokenDataPeasy = useStoreActions((actions) => actions.token.setTokenData)
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = '/auth/login'
      try {
        const response = await request(base, qry, 'post', body, null)
        setTokenData({ token: response?.token })
        // TODO: Eliminar para solo utilizar zustand
        setTokenDataPeasy({ token: response?.token })
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useAuthUser
