import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetAnalytics = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlProcess
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const qry = `/${companyId}/analytics/${queryParams.type}`
  return useQuery({
    queryKey: [qry],
    queryFn: async ({ signal }) => {
      try {
        const response = await request(base, qry, 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useGetAnalytics
