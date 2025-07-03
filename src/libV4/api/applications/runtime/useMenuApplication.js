import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'

const useMenuApplication = (props) => {
  const request = useApiRequest()
  return useMutation({
    mutationFn: async (id) => {
      const base = baseUrls.urlApps
      const qry = `/runtime/${id}/menu`
      try {
        const response = await request(base, qry, 'get', null, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: props.onSuccess,
    onError: props.onError,
  })
}

export default useMenuApplication
