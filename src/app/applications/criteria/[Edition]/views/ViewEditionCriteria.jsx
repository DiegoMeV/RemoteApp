import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormCriteria } from '../components'

const ViewEditionCriteria = ({ infoCriteria, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`${idEdition === 'new' ? 'Creación' : 'Edición'} de criterio`}
            backpath={`/applications/criteria`}
          />
          <FormCriteria
            infoCriteria={infoCriteria}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionCriteria
