import { useMutation } from '@tanstack/react-query'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGetBufferReport = (queryParams) => {
  const { token } = useStoreState((state) => state.token.tokenData) || {}
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = queryParams.companyId ?? companyData?.companyId
  return useMutation({
    mutationFn: async (props) => {
      const base = `${baseUrls.urlDocuments}/${idCompany}/apps-specific/cgr/ficha-dashboard`
      try {
        const response = await fetch(`${base}${props?.qry ?? ''}`, {
          method: props?.method ?? 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: props.body ? JSON.stringify(props?.body) : null,
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

export default useGetBufferReport
