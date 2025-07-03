import { useQuery } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useTypeProcessInfo = ({ baseKey = 'urlProcess' } = {}) => {
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)
  const userData = useStoreState((state) => state.user.userData)

  // TO-DO:
  // variationParams doesn't work because it's defined in other component, for work needs to set in null or '' when the component is unmounted
  const request = useApiRequest()
  const baseUrl = baseUrls[baseKey] ?? ''

  const idCompanyAccess = userData?.companies[0]?.companyId

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}?includeGroup=true`

  return useQuery({
    enabled: !!idProcessType && !!baseKey,
    refetchOnMount: 'always',
    queryKey: [qry],
    queryFn: async ({ signal }) => {
      try {
        const response = await request(baseUrl, qry, 'get', null, {
          signal,
        })
        return response
      } catch (error) {
        throw error
      }
    },
  })
}

export default useTypeProcessInfo
