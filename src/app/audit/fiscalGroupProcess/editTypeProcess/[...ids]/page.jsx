import { baseUrls, ErrorPage, Loading, useProcessTypeById } from '@/lib'
import { ViewEdition } from './views'
import { useParams } from 'react-router-dom'

const EditionTypeProcess = () => {
  const { idGroup, idProcessType } = useParams()
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

export default EditionTypeProcess
