import { ErrorPage, Loading, useProcessTypeById } from '@/lib'
import { ViewEdition } from './views'
import { useParams } from 'react-router-dom'

const EditionProcessTypes = () => {
  const { idGroup, idProcessType } = useParams()
  const {
    data: dataProcessType,
    isLoading,
    isError,
  } = useProcessTypeById({ idProcessType: idProcessType })

  return (
    <>
      {isLoading ? (
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

export default EditionProcessTypes
