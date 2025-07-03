import { useMutation } from '@tanstack/react-query'
import { useApiRequest } from '../../hooks'

const useMutationDynamicApi = (queryParams) => {
  const { qry = '', method = 'post', onSuccess, onError } = queryParams
  const request = useApiRequest()

  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(null, qry, method, body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: onSuccess,
    onError: onError,
  })
}

export default useMutationDynamicApi
