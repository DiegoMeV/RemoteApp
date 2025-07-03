import { baseUrls, ErrorPage, Loading, useAllProcessTypeByGroup } from '@/lib'
import { ViewProcessType } from './views'

const ProcessTypes = ({ params }) => {
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
