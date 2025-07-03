import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useDownloadExcel = ({ baseUrl, url, method, ...queryParams }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const { token } = useStoreState((state) => state.token.tokenData) || {}
  const idCompany = companyData?.companyId
  return useMutation({
    mutationFn: async () => {
      try {
        const response = await fetch(`${baseUrls?.[baseUrl]}/${idCompany}${url}`, {
          method: method || 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })
        if (!response.ok) {
          // If the response status is 4xx or 5xx, throw an error
          const errorBody = await response.json()
          const error = new Error(errorBody.message || 'An error occurred')
          error.status = response.status
          error.data = errorBody
          throw error
        }
        const blob = await response.blob()
        return blob
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams?.onSuccess,
    onError: queryParams?.onError,
  })
}

export default useDownloadExcel
