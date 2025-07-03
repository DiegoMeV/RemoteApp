import { baseUrls, useApiRequest } from '@/lib'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetRegenerateDocument = (queryParams) => {
  const request = useApiRequest()
  const base = baseUrls.urlDocuments
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const url = `/${companyId}/documentos/${queryParams.idDocument}/regenerar`

  return useMutation({
    mutationFn: async ({ qry, signal }) => {
      const newURl = `${url ?? ''}${qry}`
      try {
        const response = await request(base, newURl, 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams?.onSuccess,
    onError: queryParams?.onError,
  })
}

export default useGetRegenerateDocument
