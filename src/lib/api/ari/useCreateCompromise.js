import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useCreateCompromise = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyid = companyData?.companyId || ''
  const base = baseUrls.urlCgr
  return useMutation({
    mutationFn: async (body) => {
      const qry = `/${companyid}/compromisosAri/${body.mesas_ari_id}`
      delete body.mesas_ari_id
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useCreateCompromise
