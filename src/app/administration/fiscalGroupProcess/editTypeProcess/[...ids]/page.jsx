import { baseUrls, ErrorPage, Loading, useProcessTypeById } from '@/lib'
import { ViewEdition } from './views'

const Edition = ({ params }) => {
  const [idGroup, idProcessType] = params.ids
  const {
    data: dataProcessType,
    isFetching,
    isError,
  } = useProcessTypeById({ idProcessType: idProcessType, baseUrl: baseUrls.urlFiscalizacion })

  return (
    <>
      {isFetching ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <ViewEdition
          idGroup={idGroup}
          dataProcessType={dataProcessType?.data?.[0]}
          isNew={idProcessType === 'new'}
        />
      )}
    </>
  )
}

export default Edition
