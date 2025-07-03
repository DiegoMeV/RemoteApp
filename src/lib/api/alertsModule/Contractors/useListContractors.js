import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useListContractors = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const base = `${baseUrls.urlCgr}/${idCompany}/terceros`

  return useQuery({
    queryKey: [queryParams?.qry],
    enabled: queryParams?.id !== 'new',
    queryFn: async ({ signal }) => {
      try {
        const response = await request(base, queryParams?.qry ?? '', 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useListContractors
