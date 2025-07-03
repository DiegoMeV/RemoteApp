import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormRegion } from '../components'

const ViewEditionRegion = ({ infoRegion, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={idEdition === 'new' ? 'Creación de región' : 'Edición de región'}
            backpath={`/applications/ubication/regions`}
          />
          <FormRegion
            infoRegion={infoRegion}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionRegion
