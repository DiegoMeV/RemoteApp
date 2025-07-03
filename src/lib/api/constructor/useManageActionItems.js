import { useMutation } from '@tanstack/react-query'

import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useManageActionItems = (queryParams) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const request = useApiRequest()
  const base = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const qry = `/${idCompanyAccess}/process-types/activity-actions/`

  return useMutation({
    mutationFn: async (body) => {
      const { idTaskAction, idItem, method, ...creation } = body
      const qryComplete = `${qry}${idTaskAction}/items/${idItem ?? ''}`
      const response = await request(base, qryComplete, method, creation, null)

      return response
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useManageActionItems
