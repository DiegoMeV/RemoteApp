import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useSearchHierarchy = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlUsers
  const companyData = useStoreState((state) => state.company.companyData)
  const qry = `/${companyData?.companyId}/hierarchy${queryParams?.qry ?? ''}`
  return useQuery({
    enabled: queryParams?.enabled ?? true,
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

export default useSearchHierarchy
