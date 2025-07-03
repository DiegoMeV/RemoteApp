import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'

const useCreateActions = (queryParams) => {
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
      try {
        const { idActivity, ...creation } = body
        const qryComplete = `${qry}${idActivity}/actions`
        const response = await request(base, qryComplete, 'post', creation, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useCreateActions
