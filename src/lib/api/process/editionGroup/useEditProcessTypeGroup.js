import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useEditProcessTypeGroup = (props) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async (body) => {
      const base = props.baseUrl ?? baseUrls.urlProcess
      const qry = `/${companyData?.companyId}/process-type-groups/${props.idGroup}`
      try {
        const response = await request(base, qry, 'put', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: props.onSuccess,
    onError: props.onError,
  })
}

export default useEditProcessTypeGroup
