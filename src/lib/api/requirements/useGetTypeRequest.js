import { baseUrls } from '@/lib'
import { useApiRequest } from '@/lib/hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetTypeRequest = (queryParams) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const request = useApiRequest()
  const base = baseUrls.urlCgr
  const baseUrl = `/${companyData?.companyId}/tipoSolicitud`
  const getQuery = (options) => {
    let queryParams = ''
    if (options?.searchTypeRequest) {
      queryParams += `?palabraClave=${options.searchTypeRequest}`
    }
    return `${baseUrl}${queryParams}`
  }
  const qry = getQuery(queryParams)
  return useQuery({
    queryKey: [qry],
    queryFn: async () => {
      try {
        const response = await request(base, qry, 'get', null, null)
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useGetTypeRequest
