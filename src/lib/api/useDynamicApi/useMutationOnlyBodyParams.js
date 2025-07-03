import { useMutation } from '@tanstack/react-query'
import { useApiRequest } from '../../hooks'
import { useStoreState } from 'easy-peasy'
import { baseUrls } from '@/lib/constants'

const useMutationOnlyBodyParams = ({ ...queryOptions }) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)

  return useMutation({
    mutationFn: async ({
      url = '',
      methodBody,
      body,
      companyId,
      baseKey,
      isCompanyRequest,
      onSuccess,
      onError,
      enabled = true,
    } = {}) => {
      const newURl = `${url ?? ''}`
      const idCompany = companyId ?? companyData?.companyId
      let base = baseUrls[baseKey] || ''
      if (isCompanyRequest) {
        base += `/${idCompany}`
      }
      if (!enabled) return
      try {
        const response = await request(base, newURl, methodBody ?? 'post', body ?? null, null)
        onSuccess?.(response)
        return response
      } catch (error) {
        onError?.(error)
        throw error
      }
    },
    ...queryOptions,
  })
}

export default useMutationOnlyBodyParams
