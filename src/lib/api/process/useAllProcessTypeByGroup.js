import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useAllProcessTypeByGroup = (queryParams) => {
  const request = useApiRequest()
  const base = queryParams?.baseUrl ?? baseUrls.urlProcess
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = queryParams.idCompany ? queryParams.idCompany : companyData?.companyId
  const qry = queryParams?.checkUser
    ? `/${companyId}/process-types?idGroup=${queryParams?.idGroup}&checkUserAccess=true&all=${
        queryParams?.allProcessTypes ?? false
      }${queryParams?.qry ? `&${queryParams.qry}` : ''}`
    : `/${companyId}/process-types?idGroup=${queryParams?.idGroup}&all=${
        queryParams?.allProcessTypes ?? false
      }${queryParams?.qry ? `&${queryParams.qry}` : ''}`

  return useQuery({
    queryKey: [qry],
    enabled: queryParams?.enabled ?? true,
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

export default useAllProcessTypeByGroup
