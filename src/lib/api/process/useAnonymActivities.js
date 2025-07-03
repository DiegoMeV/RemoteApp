import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'

const useAnonymActivities = (queryParams) => {
  const base = baseUrls.urlProcess
  const request = useApiRequest()
  const qry = `/${queryParams.idCompany}/processes/${queryParams.idProcess}/activities/anonym`
  return useMutation({
    mutationFn: async (body) => {
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

export default useAnonymActivities
