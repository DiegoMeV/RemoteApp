import { TitleAlerts } from '@/app/applications/components'
import { BackdropLoading, ErrorPage, Loading } from '@/lib'
import { StepsToCreateAlert } from '../components'

const ViewEditingAlert = ({
  idEdition,
  isLoading,
  isError,
  infoAlert,
  errorBlocks,
  blocksByModel,
  variablesObject,
  loadingBlocks,
  isView,
}) => {
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
              !idEdition ? 'Creación de alerta' : `Edición de alerta ${infoAlert?.identificador}`
            }
            backpath='/applications/alerts'
          />
          {loadingBlocks ? (
            <BackdropLoading loading={loadingBlocks} />
          ) : errorBlocks ? (
            'Error al cargar bloques'
          ) : (
            <StepsToCreateAlert
              infoAlert={infoAlert}
              blocksByModel={blocksByModel}
              variablesObject={variablesObject}
              idEdition={idEdition}
              isView={isView}
            />
          )}
        </>
      )}
    </>
  )
}

export default ViewEditingAlert
