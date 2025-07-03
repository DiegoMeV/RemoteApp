import { ViewEditingAlert } from './view'
import { NoAccessCard, useGetAlertsMonitoring } from '@/lib'
import { AccessControl } from '@/libV4'
import { useParams } from 'react-router-dom'

const EditAlertMonitoring = () => {
  const params = useParams()
  const idAlert = params?.idAlert
  const {
    data: infoAlertSelect,
    isFetching,
    isError,
  } = useGetAlertsMonitoring({
    enabled: idAlert !== undefined,
    qry: `/${idAlert}?aumentarInfo=true`,
  })

  return (
    <AccessControl
      privilege={'cgr.alertas.editar_alertas'}
      nodeContent={<NoAccessCard />}
    >
      <ViewEditingAlert
        infoAlert={infoAlertSelect?.data?.[0]}
        isLoading={isFetching}
        isError={isError}
        idAlert={idAlert}
      />
    </AccessControl>
  )
}

export default EditAlertMonitoring
