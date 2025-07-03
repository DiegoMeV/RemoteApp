import { baseUrls } from '@/libV4/constants'
import { useApiRequest } from '@/libV4/hooks'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useSubmitRuntime = ({ qry, method = 'post', companyId, ...props } = {}) => {
  const request = useApiRequest()
  const companyData = useStoreState((state) => state.company.companyData)

  const idCompany = companyId ?? companyData?.companyId
  return useMutation({
    mutationFn: async ({ bodyQry, body = null, bodyMethod }) => {
      const base = baseUrls.urlApps
      const url = `/runtime/${idCompany}/form${qry ?? ''}${bodyQry ?? ''}`
      try {
        const response = await request(base, url, bodyMethod ?? method, body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    ...props,
  })
}

export default useSubmitRuntime
