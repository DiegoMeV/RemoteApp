import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetRolesPagination = ({ searchText }) => {
  const request = useApiRequest()
  const base = baseUrls.urlUsers
  const companyData = useStoreState((state) => state.company.companyData)
  const qry = `/${companyData?.companyId}/roles?rowsPerPage=5&querySearch=${searchText}`
  return useQuery({
    queryKey: [searchText, qry],
    enabled: searchText?.length > 2,
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

export default useGetRolesPagination
