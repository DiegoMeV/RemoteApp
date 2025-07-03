import { useApiRequest } from '../../hooks'
import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '../../constants'
import { useRootStore } from '../../store'

const useSiifWeb = (queryParams) => {
  const request = useApiRequest()
  const { setTokenData } = useRootStore()

  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = '/auth/siifweb/login'
      try {
        const response = await request(base, qry, 'post', body, null)
        setTokenData({ token: response?.token })
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useSiifWeb
