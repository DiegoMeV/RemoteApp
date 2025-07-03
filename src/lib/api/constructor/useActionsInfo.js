import { useQuery } from '@tanstack/react-query'

import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useActionsInfo = ({ idTask, expandedEnabled }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const request = useApiRequest()
  const baseUrl = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId
  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}/stages/${stageSelected.id}/activities/${idTask}/actions?inclGoToTask=true`

  return useQuery({
    queryKey: [qry],
    enabled: !!idProcessType && !!stageSelected?.id && !!idTask && !!expandedEnabled,
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

export default useActionsInfo
