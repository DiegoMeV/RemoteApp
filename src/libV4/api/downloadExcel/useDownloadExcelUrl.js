import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useDownloadExcelUrl = ({ baseUrl, method, ...queryParams }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const { token } = useStoreState((state) => state.token.tokenData) || {}
  const idCompany = companyData?.companyId

  return useMutation({
    mutationFn: async ({ url }) => {
      try {
        const response = await fetch(`${baseUrls?.[baseUrl]}/${idCompany}${url}`, {
          method: method || 'GET',
          headers: { Authorization: `Bearer ${token}` },
        })

        if (!response.ok) {
          const errorBody = await response.json()
          const error = new Error(errorBody?.error || errorBody.message || 'An error occurred')
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

export default useDownloadExcelUrl
