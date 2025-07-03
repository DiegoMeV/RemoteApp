import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useEditCriteria = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const base = baseUrls.urlCgr
  const qry = `/${companyId}/criterios/${queryParams.idCriteria}`
  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(base, qry, 'put', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useEditCriteria
