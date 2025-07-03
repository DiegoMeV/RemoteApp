import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetRegion = () => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const base = baseUrls.urlCgr
  const qry = `/${companyData?.companyId}/region`

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

export default useGetRegion
