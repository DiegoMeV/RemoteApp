import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useUploadDocument = ({ newCompanyId = '', onSuccess, onError }) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = newCompanyId?.length ? newCompanyId : companyData?.companyId

  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlDocuments
      const qry = `/${idCompany}/documentos/uploadDoc`
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: onSuccess,
    onError: onError,
  })
}

export default useUploadDocument
