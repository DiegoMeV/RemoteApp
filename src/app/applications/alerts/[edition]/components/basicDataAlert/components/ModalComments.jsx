import { ErrorPage, GenericTable, useAlertasProceso } from '@/lib'
import { columnsComments } from '../constant'

const ModalComments = ({ idAlert }) => {
  const {
    data: alertasByProcess,
    isFetching: loadingAlertsByProcess,
    isError: errorAlertsByProcess,
  } = useAlertasProceso({
    qry: `?idAlerta=${idAlert}`,
  })

  const alerts = alertasByProcess?.data?.filter((alert) => !!alert?.comentario)

  return (
    <>
      {errorAlertsByProcess ? (
        <ErrorPage />
      ) : (
        <GenericTable
          rows={alerts}
          loading={loadingAlertsByProcess}
          columns={columnsComments ?? []}
        />
      )}
    </>
  )
}

export default ModalComments
