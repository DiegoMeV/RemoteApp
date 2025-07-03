import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormResultType } from '../components'

const ViewEditionResultTypes = ({ resultTypeInfo, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`${idEdition === 'new' ? 'Creación' : 'Edición'} de tipos de resultado`}
            backpath={`/applications/resultTypes`}
          />
          <FormResultType
            resultTypeInfo={resultTypeInfo}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionResultTypes
