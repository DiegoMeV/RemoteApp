import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGetBufferTemplate = (queryParams) => {
  const { token } = useStoreState((state) => state.token.tokenData)
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async (queryParams) => {
      const base = baseUrls.urlDocuments
      const qry = `/${companyData?.companyId}/archivos/${queryParams.idTemplate}/plantillas/${queryParams.idVersion}`
      try {
        const response = await fetch(`${base}${qry}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.ponError,
  })
}

export default useGetBufferTemplate
