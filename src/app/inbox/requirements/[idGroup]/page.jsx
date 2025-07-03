import { ErrorPage, Loading, useAllProcessTypeByGroup, useProcessTypeByGroup } from '@/lib'
// TODO: import AccessControl from '@/app/AccessControl'
import { ViewRequirements } from './views'
import { useParams } from 'react-router-dom'

const Requirements = () => {
  const params = useParams()
  const idGroup = params.idGroup
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
    <ViewRequirements
      processTypes={processTypes}
      infoGroup={processGroupsData?.data?.[0] || {}}
    />
  )
}

export default Requirements
