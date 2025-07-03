//custom hook to get petition data from the server
// DEPRECATED
import { baseUrls } from '@/lib/constants'
import { useApiRequest } from '@/lib/hooks'
import { useStoreState } from 'easy-peasy'

const useConstructorData = (idProcessType) => {
  const variationParams = useStoreState((actions) => actions.reactFlowState.variationParams)

  const baseURL = baseUrls[variationParams?.builderService] ?? 'urlProcess'

  const userData = useStoreState((state) => state.user.userData)
  const idCompanyAccess = userData?.companies[0]?.companyId

  const requestGet = useApiRequest()

  const getProcessTypesStages = async (setLoaded) => {
    if (!idCompanyAccess) return
    setLoaded((prevState) => {
      return { ...prevState.data, loading: true }
    })

    const queryURL = `/${idCompanyAccess}/process-types/${idProcessType}/stages`
    if (!variationParams?.builderService) {
      return
    }
    const req = await requestGet(baseURL, queryURL, 'get')
    setLoaded((prevState) => {
      return { ...prevState.data, loading: false }
    })
    return req
  }

  const getProcessTypesBasicInfo = async () => {
    if (!idCompanyAccess) return

    const queryURL = `/${idCompanyAccess}/process-types/${idProcessType}?includeGroup=true`
    if (!variationParams?.builderService) {
      return
    }
    return await requestGet(baseURL, queryURL, 'get')
  }

  return { getProcessTypesStages, getProcessTypesBasicInfo }
}

export default useConstructorData
