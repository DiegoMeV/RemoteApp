import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGetAnalyticsModule = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const base = baseUrls.urlCgr
  let qry = `/${companyId}/analytics`
  return useMutation({
    mutationFn: async (options) => {
      let currentQry = qry
      if (options?.qry) {
        currentQry += `${options?.qry}`
      }
      try {
        const response = await request(base, currentQry, 'get', null, null)
        return { type: options.type, result: response }
      } catch (error) {
        throw { type: options.type, error }
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useGetAnalyticsModule
