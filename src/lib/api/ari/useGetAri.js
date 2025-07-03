import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetRecord = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlCgr
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const baseUrl = `/${idCompany}/registroAri${queryParams?.qry ?? ''}`

  const getQuery = (options) => {
    let queryParams = ''

    const url = `/${idCompany}/registroAri`

    if (options?.searchType) {
      queryParams += `?palabraClave=${options.searchType}`
      return `${url}${queryParams}`
    }

    return `${baseUrl}${queryParams}`
  }

  const qry = getQuery(queryParams)

  return useQuery({
    queryKey: [qry],
    enabled: queryParams?.enabled,
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

export default useGetRecord
