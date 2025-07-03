import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useEditRegionByContract = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const base = baseUrls.urlCgr
  return useMutation({
    mutationFn: async (body) => {
      const { id, ...newBody } = body
      const qry = `/${companyId}/regionesContrato/${id}`
      try {
        const response = await request(base, qry, 'put', newBody, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useEditRegionByContract
