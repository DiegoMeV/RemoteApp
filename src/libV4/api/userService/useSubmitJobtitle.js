import { useApiRequest } from '../../hooks'
import { baseUrls } from '../../constants'
import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

const useSubmitJobtitle = ({ qry, method = 'post', companyId, ...props } = {}) => {
  const request = useApiRequest()
  const userData = useStoreState((state) => state.user.userData)

  const idCompany = companyId ?? userData?.companies?.[0]?.companyId
  return useMutation({
    mutationFn: async ({ bodyQry, body = null, bodyMethod }) => {
      const base = baseUrls.urlUsers
      const url = `/${idCompany}/jobTitles${qry ?? ''}${bodyQry ?? ''}`
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

export default useSubmitJobtitle
