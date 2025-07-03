import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetCatModel = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlCgr
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const newQry = `${base}/${idCompany}/modelosAlertas${queryParams?.qry ?? ''}`

  return useQuery({
    queryKey: [newQry],
    enabled: queryParams?.enabled ?? true,
    queryFn: async ({ signal }) => {
      try {
        const response = await request(base, newQry, 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useGetCatModel
