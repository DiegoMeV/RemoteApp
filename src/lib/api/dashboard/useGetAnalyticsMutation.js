import { useMutation } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGetAnalyticsMutation = (queryParams) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)
  const companyId = companyData?.companyId || ''
  const base = baseUrls.urlProcess
  return useMutation({
    mutationFn: async (queryParams) => {
      const qry = `/${companyId}/analytics/${queryParams.type}${
        queryParams.qryParam ? `?${queryParams.qryParam}` : ''
      }`
      try {
        const response = await request(base, qry, 'get', null, null)
        const type = queryParams?.type.replace('?wholeCompany=true', '')
        queryParams.setValue?.((prevState) => ({
          ...prevState,
          [type]: response.data,
        }))
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useGetAnalyticsMutation
