import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormActingType } from '../components'

const ViewEditionActingTypes = ({ actingTypes, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`${idEdition === 'new' ? 'Creación' : 'Edición'} de tipos de actuación`}
            backpath={`/applications/actingTypes`}
          />
          <FormActingType
            actingTypes={actingTypes}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionActingTypes
