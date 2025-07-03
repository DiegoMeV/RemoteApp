import { useMutation } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'

const useMagicLink = (queryParams) => {
  const request = useApiRequest()

  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = '/auth/magicLink'
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useMagicLink
