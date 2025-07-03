import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useUpdateProcess = (props) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  return useMutation({
    mutationFn: async (body) => {
      const base = baseUrls.urlProcess
      const qry = `/${companyData?.companyId}/processes/${props.idProcess}/activities/${props.idActivity}/actions`
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: props?.onSuccess,
    onError: props?.onError,
  })
}

export default useUpdateProcess
