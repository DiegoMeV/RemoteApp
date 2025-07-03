import { useQuery } from '@tanstack/react-query'

import { useApiRequest } from '../../hooks'
import { baseUrls } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useStagesInfo = ({ infoTypeProcess, isSuccess }) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)
  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const request = useApiRequest()
  const baseUrl = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}/stages`

  return useQuery({
    enabled: !infoTypeProcess && !isSuccess ? false : true,
    refetchOnMount: 'always',
    queryKey: [`/${idCompanyAccess}/process-types/${idProcessType}/stages`],
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

export default useStagesInfo
