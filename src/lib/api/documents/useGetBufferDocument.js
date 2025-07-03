import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGetBufferDocument = (queryParams) => {
  const companyData = useStoreState((state) => state.company.companyData)
  const { token } = useStoreState((state) => state.token.tokenData) || {}
  const idCompany = companyData?.companyId
  return useMutation({
    mutationFn: async (props) => {
      const base = queryParams?.baseUrl
        ? `${queryParams?.baseUrl}/${idCompany}`
        : `${baseUrls.urlDocuments}/${idCompany}/archivos/`
      try {
        const response = await fetch(`${base}${props?.qry ?? ''}`, {
          method: props?.method ?? 'GET',
          headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' },
          body: props.body ? JSON.stringify(props?.body) : null,
        })
        if (!response.ok) {
          // If the response status is 4xx or 5xx, throw an error
          const errorBody = await response.json()
          const error = new Error(errorBody.message || 'An error occurred')
          error.status = response.status
          error.data = errorBody
          throw error
        }
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams?.onSuccess,
    onError: queryParams?.onError,
  })
}

export default useGetBufferDocument
