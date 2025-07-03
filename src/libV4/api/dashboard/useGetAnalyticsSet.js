import { baseUrls } from '@/libV4/constants'
import { useApiRequest } from '@/libV4/hooks'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetAnalyticsSet = ({
  baseKey = null,
  companyId = null,
  isCompanyRequest = true,
  queryParam = '',
  setValue = {},
  onSuccess = () => {},
  onError = () => {},
} = {}) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyId ?? companyData?.companyId

  let base = baseUrls[baseKey] || ''

  if (isCompanyRequest) {
    base += `/${idCompany}`
  }

  return useMutation({
    mutationFn: async ({
      type = '',
      additionalParam = '',
      paramTable = '',
      isResponseObject = false,
    } = {}) => {
      const qry = `/analytics/${type}?${queryParam ?? ''}${
        additionalParam ? `&${additionalParam}` : ''
      }${paramTable}`
      try {
        const response = await request(base, qry, 'get', null, null)
        const typeName = type?.replace('?wholeCompany=true', '')
        setValue((prevState) => {
          return {
            ...prevState,
            [typeName]: !isResponseObject ? response?.data : response,
          }
        })
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess,
    onError,
  })
}

export default useGetAnalyticsSet
