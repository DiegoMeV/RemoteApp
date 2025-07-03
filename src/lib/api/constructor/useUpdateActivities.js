import { useMutation } from '@tanstack/react-query'

import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useUpdateActivities = (queryParams) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const request = useApiRequest()
  const base = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const stageSelected = useStoreState((actions) => actions.reactFlowState.stageSelected)

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}/stages/${stageSelected.id}/activities/`

  return useMutation({
    mutationFn: async (body) => {
      const qryActivity = `${qry}${body.id}`
      const response = await request(base, qryActivity, 'put', body, null)

      return response
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useUpdateActivities
