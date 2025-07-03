// import { ViewForAlerts } from './views'
import { NoAccessCard, useGetAlertsMonitoring, usePrivileges, useSearch } from '@/lib'
import { columnsForAllAlerts } from './funcs'
import { useNavigate } from 'react-router-dom'
import { ViewForAlerts } from './views'
import { AccessControl } from '@/libV4'

//crear privilegio para crear o editar tipo de actuacion en seguimiento de alertas,
//esa columna se debera llamar 'gestionar'
const AlertMonitoring = () => {
  const navigate = useNavigate()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_alertas')
  const { columns } = columnsForAllAlerts(navigate, hasPrivilege)
  const searchAlert = useSearch()
  const {
    data: alerts,
    isFetching,
    isError,
  } = useGetAlertsMonitoring({
    qry: searchAlert.searchText
      ? `?aumentarInfo=true&palabraClave=${searchAlert.searchText}`
      : '?aumentarInfo=true',
  })
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_seguimiento_alertas'}
      nodeContent={<NoAccessCard />}
    >
      <ViewForAlerts
        alerts={alerts}
        isLoading={isFetching}
        isError={isError}
        columns={columns}
        searchAlert={searchAlert}
      />
    </AccessControl>
  )
}

export default AlertMonitoring
