import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useProcessTypeByGroup = (queryParams) => {
  const request = useApiRequest()
  const base = queryParams?.baseUrl ?? baseUrls.urlProcess
  const companyData = useStoreState((state) => state.company.companyData)
  const qry = `/${companyData?.companyId}/process-type-groups/${queryParams?.qry ?? ''}`
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
    retry: 3,
  })
}

export default useProcessTypeByGroup
