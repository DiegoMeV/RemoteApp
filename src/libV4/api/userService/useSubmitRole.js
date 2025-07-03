import { useApiRequest } from '../../hooks'
import { baseUrls } from '../../constants'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useSubmitRole = ({ qry, method = 'post', companyId, ...props } = {}) => {
  const request = useApiRequest()
  // TODO : const { companyData } = useRootStore()
  const companyData = useStoreState((state) => state.company.companyData)

  const idCompany = companyId ?? companyData?.companyId
  return useMutation({
    mutationFn: async ({ bodyQry, body = null, bodyMethod }) => {
      const base = baseUrls.urlUsers
      const url = `/${idCompany}/roles${qry ?? ''}${bodyQry ?? ''}`
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

export default useSubmitRole
