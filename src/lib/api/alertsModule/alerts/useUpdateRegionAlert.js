import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useUpdateRegionAlert = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId
  const base = `${baseUrls.urlCgr}/${companyId}`

  return useMutation({
    mutationFn: async (props) => {
      const qry = `/regionesAlerta/${props.id}`
      try {
        const response = await request(base, qry, 'put', props.body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useUpdateRegionAlert
