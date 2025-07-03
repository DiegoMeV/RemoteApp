import { StepsToCreateAlert } from '@/app/applications/alerts/[edition]/components'
import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading, useGetAlerts } from '@/lib'

const ViewAlertModified = ({
  alertService,
  setAlertService,
  handleBack,
  handleSetAlertToProcess,
}) => {
  const {
    data: infoAlertSelect,
    isLoading,
    isError,
  } = useGetAlerts({
    enabled: alertService?.view !== 'new',
    qry: alertService?.additionalData ? `/${alertService?.additionalData}?aumentarInfo=true` : '',
  })

  const handleChangeView = (id) => {
    setAlertService({ view: 'edit', additionalData: id })
  }

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
              alertService?.view === 'new'
                ? 'Creación de alerta'
                : `Edición de alerta ${infoAlertSelect?.data?.[0]?.identificador}`
            }
          />
          <StepsToCreateAlert
            infoAlert={infoAlertSelect?.data?.[0]}
            handleBack={handleBack}
            isModal={true}
            handleChangeView={handleChangeView}
            handleSetAlertToProcess={handleSetAlertToProcess}
          />
        </>
      )}
    </>
  )
}

export default ViewAlertModified
