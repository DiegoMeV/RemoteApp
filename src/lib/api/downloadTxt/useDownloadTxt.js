import { baseUrls } from '@/libV4'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useDownloadTxt = ({ baseUrl, url, method, ...queryParams }) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const { token } = useStoreState((state) => state.token.tokenData) || {}
  const idCompany = companyData?.companyId
  return useMutation({
    mutationFn: async ({ body }) => {
      try {
        const response = await fetch(`${baseUrls?.[baseUrl]}/${idCompany}${url}`, {
          method: method || 'POST',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: JSON.stringify(body),
        })
        if (!response.ok) {
          // If the response status is 4xx or 5xx, throw an error
          const errorBody = await response.json()
          const error = new Error(errorBody.message || 'An error occurred')
          error.status = response.status
          error.data = errorBody
          throw error
        }
        const headers = response.headers
        const blob = await response.blob()
        return { blob, headers }
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams?.onSuccess,
    onError: queryParams?.onError,
  })
}

export default useDownloadTxt
