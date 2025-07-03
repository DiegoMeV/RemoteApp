import { ErrorPage, Loading, useAllProcessTypeByGroup } from '@/lib'
import { ViewProcessType } from './views'
import { useParams, useSearchParams } from 'react-router-dom'

const ProcessTypes = () => {
  const params = useParams()
  const [searchParams] = useSearchParams()
  const idApplication = searchParams.get('idApplication')
  const {
    data: dataProcessTypes,
    isLoading,
    isError,
  } = useAllProcessTypeByGroup({ idGroup: params.idGroup, allProcessTypes: true })

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ViewProcessType
          isLoading={isLoading}
          isError={isError}
          groupSelected={dataProcessTypes}
          idGroup={params.idGroup}
          idApplication={idApplication}
        />
      )}
    </>
  )
}

export default ProcessTypes
