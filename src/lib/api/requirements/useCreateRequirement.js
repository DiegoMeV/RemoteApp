import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'

const useCreateRequirement = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlProcess
      const qry = `/${companyData?.companyId}/processes${queryParams?.qry ?? ''}`
      try {
        const response = await request(base, qry, queryParams?.method ?? 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useCreateRequirement
