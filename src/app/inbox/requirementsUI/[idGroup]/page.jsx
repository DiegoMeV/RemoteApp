import {
  ErrorPage,
  Loading,
  useAllProcessTypeByGroup,
  useGetAllParams,
  useProcessTypeByGroup,
} from '@/lib'
import { ViewRequirementsUI } from './views'
import { useParams } from 'react-router-dom'

const RequirementsUI = () => {
  const params = useParams()
  const idGroup = params.idGroup
  const paramsRoute = useGetAllParams()
  const idProcessParent = paramsRoute?.idProcessParent ?? null
  const idParentActivity = paramsRoute?.idParentActivity ?? null
  const {
    data: processTypes,
    isLoading: loadingProcessTypes,
    isError: errorProcessTypes,
  } = useAllProcessTypeByGroup({ idGroup, allProcessTypes: false })
  const {
    data: processGroupsData,
    isLoading: loadingGroupInfo,
    isError: errorGroupInfo,
  } = useProcessTypeByGroup({ qry: `/${idGroup}` })
  const isLoading = loadingProcessTypes || loadingGroupInfo
  const isError = errorProcessTypes || errorGroupInfo

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <ErrorPage />
  ) : (
    <ViewRequirementsUI
      processTypes={processTypes}
      infoGroup={processGroupsData?.data?.[0] || {}}
      idProcessParent={idProcessParent}
      idParentActivity={idParentActivity}
    />
  )
}

export default RequirementsUI
