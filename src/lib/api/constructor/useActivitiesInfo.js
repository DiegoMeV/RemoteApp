import { useQuery } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useActivitiesInfo = () => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const request = useApiRequest()
  const baseUrl = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}/stages/${stageSelected.id}/activities?inclRoleInfo=true&inclNextTaskInfo=true&inclActorTypeToNotif=true`

  // TODO: PONER MAS VALIDACIONES AL ENABLED Y/O USAR EL QUERY GENERICO
  return useQuery({
    queryKey: [qry],
    enabled: !!stageSelected?.id,
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

export default useActivitiesInfo
