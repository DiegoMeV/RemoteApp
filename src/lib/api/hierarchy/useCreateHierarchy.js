import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useCreateHierarchy = (props) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlUsers
      const qry = `/${companyData?.companyId}/hierarchy`
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: props.onSuccess,
    onError: props.onError,
  })
}

export default useCreateHierarchy
