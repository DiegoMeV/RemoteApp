import { baseUrls, ErrorPage, Loading, useAllProcessTypeByGroup } from '@/lib'
import { ViewProcessType } from './views'
import { useParams } from 'react-router-dom'

const ProcessTypes = () => {
  const params = useParams()
  const {
    data: dataProcessTypes,
    isFetching,
    isError,
  } = useAllProcessTypeByGroup({
    idGroup: params.idGroup,
    allProcessTypes: true,
    baseUrl: baseUrls.urlFiscalizacion,
  })

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ViewProcessType
          isLoading={isFetching}
          isError={isError}
          groupSelected={dataProcessTypes}
          idGroup={params.idGroup}
        />
      )}
    </>
  )
}

export default ProcessTypes
