import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useProcessTypeById = (queryParams) => {
  const request = useApiRequest()
  const base = queryParams?.baseUrl ?? baseUrls.urlProcess
  const companyData = useStoreState((state) => state.company.companyData)
  const qry = `/${companyData?.companyId}/process-types/${queryParams.idProcessType}`
  return useQuery({
    queryKey: [qry],
    enabled: queryParams.idProcessType !== 'new',
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

export default useProcessTypeById
