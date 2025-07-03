import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useEditVariableModel = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const base = baseUrls.urlCgr
  return useMutation({
    mutationFn: async (body) => {
      try {
        const qry = `/${companyId}/variablesModelo/${body?.id}`
        const response = await request(base, qry, 'put', body.data, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useEditVariableModel
