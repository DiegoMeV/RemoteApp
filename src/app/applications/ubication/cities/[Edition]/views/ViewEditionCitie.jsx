import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormCitie } from '../components'

const ViewEditionCitie = ({ infoCitie, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`${idEdition === 'new' ? 'Creación de municipio' : 'Edición de municipio'}`}
            backpath={`/applications/ubication/cities`}
          />
          <FormCitie
            infoCitie={infoCitie}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionCitie
