import { useMutation } from '@tanstack/react-query'
import { useStoreState } from 'easy-peasy'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'

const useCreateStage = (queryParams) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const request = useApiRequest()
  const base = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}/stages`

  return useMutation({
    mutationFn: async (body) => {
      try {
        const response = await request(base, qry, 'post', body, null)
        return response
      } catch (error) {
        throw error
      }
    },
    onSuccess: queryParams.onSuccess,
    onError: queryParams.onError,
  })
}

export default useCreateStage
