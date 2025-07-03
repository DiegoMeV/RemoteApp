// PENDIENTE PARA ELIMINAR
import { useQuery } from '@tanstack/react-query'
import { baseUrls, useApiRequest } from '@/lib'
import { useStoreState } from 'easy-peasy'

const useGetAllActivities = () => {
  const request = useApiRequest()
  const baseUrl = baseUrls.urlProcess
  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const idProcessType = useStoreState((actions) => actions.reactFlowState.idProcessType)

  const qry = `/${idCompanyAccess}/process-types/${idProcessType}/util/all-activities`

  return useQuery({
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

export default useGetAllActivities
