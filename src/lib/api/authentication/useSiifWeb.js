import { useMutation } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreActions } from 'easy-peasy'

const useSiifWeb = (queryParams) => {
  const request = useApiRequest()
  const { setTokenData } = useStoreActions((actions) => actions.token)

  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = '/auth/siifweb/login'
      try {
        const response = await request(base, qry, 'post', body, null)

        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: (response) => {
      setTokenData({ token: response?.token })
      queryParams.onSuccess(response)
    },
    onError: queryParams.onError,
  })
}

export default useSiifWeb
