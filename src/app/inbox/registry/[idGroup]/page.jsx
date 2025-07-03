import { NoAccessCard, useAllProcessTypeByGroup, useProcessTypeByGroup } from '@/lib'
import ViewRegistry from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const Registry = () => {
  const params = useParams()
  const idGroup = params.idGroup
  const {
    data: processTypes,
    isFetching: loadingProcessTypes,
    isError: errorProcessTypes,
    error,
  } = useAllProcessTypeByGroup({ idGroup, allProcessTypes: false, checkUser: true })
  const {
    data: processGroupsData,
    isFetching: loadingGroupInfo,
    isError: errorGroupInfo,
  } = useProcessTypeByGroup({ qry: `/${idGroup}` })
  return (
    <AccessControl
      privilege='procesos.bandeja.radicar'
      nodeContent={<NoAccessCard />}
    >
      <ViewRegistry
        processTypes={{
          processTypes,
          isLoading: loadingGroupInfo || loadingProcessTypes,
          isError: errorGroupInfo || errorProcessTypes,
          error,
        }}
        processGroupsData={processGroupsData}
      />
    </AccessControl>
  )
}
export default Registry
