import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useUpdateVarToAlert = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const base = baseUrls.urlCgr
  const companyId = companyData?.companyId

  return useMutation({
    mutationFn: async (params) => {
      const qry = `/${companyId}/datosAlerta/${params.id}`
      try {
        const response = await request(base, qry, 'put', params.body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useUpdateVarToAlert
