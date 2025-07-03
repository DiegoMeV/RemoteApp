import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const usePrivilegesParams = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlUsers
  const companyData = useStoreState((state) => state.company.companyData)
  const baseUrl = `/${companyData?.companyId}/privileges?rowsPerPage=${queryParams.pageSize}`
  const getQuery = (options) => {
    let queryParams

    if (options.cursor !== undefined) {
      queryParams += `&querySearch=${options.searchPriv}&cursor=${options.cursor}`
    } else if (options.searchPriv?.length > 2) {
      queryParams += `&querySearch=${options.searchPriv}`
    }

    return `${baseUrl}?${queryParams}`
  }

  const qry = getQuery(queryParams)

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

export default usePrivilegesParams
