import { LoadingError, useGetProcessTypes } from '@/libV4'
import { useParams } from 'react-router-dom'
import { ViewEditTypeProcess } from './views'

const EditTypeProcess = () => {
  const { idGroup, idProcessType } = useParams()

  const {
    data: dataProcessType,
    isFetching: loadingDataProcessType,
    isError: errorLoadingDataProcessType,
    refetch: refetchDataProcessType,
  } = useGetProcessTypes({
    baseKey: 'urlProcess',
    qry: `/${idProcessType}`,
    enabled: idProcessType !== 'new',
  })

  return (
    <LoadingError
      loading={loadingDataProcessType}
      error={errorLoadingDataProcessType}
    >
      <ViewEditTypeProcess
        idGroup={idGroup}
        idProcessType={idProcessType}
        dataProcessType={dataProcessType?.data?.[0]}
        isNew={idProcessType === 'new'}
        refetchDataProcessType={refetchDataProcessType}
      />
    </LoadingError>
  )
}

export default EditTypeProcess
