import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { StepsToCreateAlert } from '../components'

const ViewEditingAlert = ({
  isLoading,
  isError,
  infoAlert,
  idAlert
}) => {
  // TODO: BackdropLoading, 
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={
              `Seguimiento de alerta ${infoAlert?.identificador}`
            }
            backpath='/applications/alertMonitoring'
          />
          <StepsToCreateAlert
            infoAlert={infoAlert}
            idAlert={idAlert}
          />
        </>
      )}
    </>
  )
}

export default ViewEditingAlert
