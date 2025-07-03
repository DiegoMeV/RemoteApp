import { useParams } from 'react-router-dom'
import { ViewEditProcessTypeGroups } from './views'
import { LoadingError, useGetProcessTypeGroups } from '@/libV4'

const EditProcessTypeGroups = () => {
  const { idApplication, idGroup } = useParams()

  const {
    data: dataGroup,
    isFetching: isLoadingGroup,
    isError: errorLoadingGroup,
    refetch: refetchGroup,
  } = useGetProcessTypeGroups({ qry: `/${idGroup}`, enabled: idGroup !== 'new' })

  return (
    <LoadingError
      loading={isLoadingGroup}
      error={errorLoadingGroup}
    >
      <ViewEditProcessTypeGroups
        idApplication={idApplication}
        idGroup={idGroup}
        dataGroup={dataGroup?.data?.[0]}
        refetchGroup={refetchGroup}
      />
    </LoadingError>
  )
}

export default EditProcessTypeGroups
