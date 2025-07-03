import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormSatellites } from '../components'

const ViewEditionSatellite = ({ satelliteInfo, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={idEdition === 'new' ? 'Creación satelite' : 'Edición de satelite'}
            backpath={`/applications/ubication/satellite`}
          />
          <FormSatellites
            satelliteInfo={satelliteInfo}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionSatellite
