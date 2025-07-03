import { useMutation } from '@tanstack/react-query'
import { useApiRequest } from '../../hooks'
import { useStoreState } from 'easy-peasy'
import { baseUrls } from '@/lib/constants'

const useMutationDynamicBaseUrl = ({
  url = null,
  baseKey = null,
  method = 'post',
  isCompanyRequest,
  companyId,
  ...queryOptions
}) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyId ?? companyData?.companyId

  let base = baseUrls[baseKey] || ''

  if (isCompanyRequest) {
    base += `/${idCompany}`
  }

  return useMutation({
    mutationFn: async ({ qry = '', methodBody, body } = {}) => {
      const newURl = `${url ?? ''}${qry}`
      try {
        const response = await request(base, newURl, methodBody ?? method, body ?? null, null)
        return response
      } catch (error) {
        throw error
      }
    },
    ...queryOptions,
  })
}

export default useMutationDynamicBaseUrl
