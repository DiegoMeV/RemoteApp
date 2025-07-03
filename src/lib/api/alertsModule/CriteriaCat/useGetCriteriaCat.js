import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetCriteriaCat = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlCgr
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const qry = `/${idCompany}/criteriosCategoria${queryParams?.qry ?? ''}`

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

export default useGetCriteriaCat
