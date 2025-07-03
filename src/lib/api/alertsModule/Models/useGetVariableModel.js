import { baseUrls, useApiRequest } from '@/lib'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetVariableModel = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const base = baseUrls.urlCgr
  const baseUrl = `/${idCompany}/variablesModelo/`

  const getQuery = (options) => {
    let queryParams = ''

    if (options?.idModel && options?.idBlock) {
      queryParams += `${options?.idModel}/${options?.idBlock}`
    }
    return `${baseUrl}${queryParams}`
  }

  const qry = getQuery(queryParams)

  return useQuery({
    queryKey: [qry],
    enabled:
      queryParams?.idModel !== 'new' &&
      queryParams?.idBlock !== undefined &&
      queryParams?.idModel !== undefined,
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

export default useGetVariableModel
