import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useUploadAditional = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlDocuments
      const qry = `/${idCompany}/documentos/uploadDoc${queryParams?.qry ?? ''}`
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

export default useUploadAditional
