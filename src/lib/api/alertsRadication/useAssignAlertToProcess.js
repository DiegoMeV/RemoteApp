import { baseUrls } from '@/lib/constants'
import { useApiRequest } from '@/lib/hooks'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useAssignAlertToProcess = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const idCompany = companyData?.companyId
  const baseUrl = baseUrls.urlCgr
  const qry = `/${idCompany}/alertasProceso`

  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(baseUrl, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}
export default useAssignAlertToProcess
