import { useQuery } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useQueryDynamicApi = ({
  url = null,
  baseKey = null,
  isCompanyRequest,
  enabled = true,
  method = 'get',
  body = null,
  idCompany = null,
  delay = 500,
  ...queryOptions
}) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = idCompany ?? companyData?.companyId
  const request = useApiRequest()

  let base = baseUrls[baseKey] || ''

  if (isCompanyRequest) {
    base += `/${companyId}`
  }

  return useQuery({
    queryKey: [url, base],
    enabled: enabled,
    queryFn: async ({ signal }) => {
      try {
        if (delay > 0) {
          await new Promise((resolve) => setTimeout(resolve, delay))
        }
        const response = await request(base, url, method, body, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
    ...queryOptions,
  })
}

export default useQueryDynamicApi
