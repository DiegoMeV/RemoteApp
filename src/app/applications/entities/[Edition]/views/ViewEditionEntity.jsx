import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormEntity } from '../components'

const ViewEditionEntity = ({ infoEntity, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={idEdition === 'new' ? 'Creación de ente' : 'Edición de ente'}
            backpath={`/applications/entities`}
          />
          <FormEntity
            infoEntity={infoEntity}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionEntity
