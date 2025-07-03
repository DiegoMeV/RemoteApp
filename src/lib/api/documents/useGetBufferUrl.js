import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useGetBufferUrl = (queryParams) => {
  const { token } = useStoreState((state) => state.token.tokenData) || {}
  return useMutation({
    mutationFn: async (props) => {
      try {
        const response = await fetch(`${props?.qry ?? ''}`, {
          method: props?.method ?? 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
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

export default useGetBufferUrl
