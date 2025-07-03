import { useQuery } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useItemsAskForInfo = ({ idTaskAction, expandedEnabled }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const request = useApiRequest()
  const baseUrl = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const enabledParamTRD = variationParams?.byActionTypes === 'fiscal'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const qryParam = enabledParamTRD ? '?includeRetentionTable=true' : ''

  const qry = `/${idCompanyAccess}/process-types/activity-actions/${idTaskAction}/items${qryParam}`

  return useQuery({
    enabled: !!idTaskAction && !!expandedEnabled,
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

export default useItemsAskForInfo
