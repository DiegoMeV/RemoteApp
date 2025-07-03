import { baseUrls } from '@/lib/constants'
import { useApiRequest } from '../../hooks'
import { useQuery } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useQueryDynamicApi = ({
  url = null,
  baseKey = null,
  isCompanyRequest = true,
  enabled = true,
  method = 'get',
  body = null,
  ...queryOptions
}) => {
  const userData = useStoreState((state) => state.user.userData)

  const idCompany = userData?.companies?.[0]?.companyId

  const request = useApiRequest()

  let base = baseUrls[baseKey] || ''

  if (isCompanyRequest) {
    base += `/${idCompany}`
  }

  return useQuery({
    queryKey: [url],
    enabled: enabled,
    queryFn: async ({ signal }) => {
      const response = await request(base, url, method, body, {
        signal,
      })
      return response
    },
    ...queryOptions,
  })
}

export default useQueryDynamicApi
