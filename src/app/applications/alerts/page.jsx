import { ViewForAlerts } from './views'
import { NoAccessCard, useGetAlerts, usePrivileges, useSearch } from '@/lib'
import { columnsForAllAlerts } from './funcs'
import { useNavigate } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const Alerts = () => {
  const navigate = useNavigate()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_alertas')
  const { columns } = columnsForAllAlerts(navigate, hasPrivilege)
  const searchAlert = useSearch()
  const {
    data: alerts,
    isFetching,
    isError,
  } = useGetAlerts({
    qry: searchAlert.searchText
      ? `?aumentarInfo=true&palabraClave=${searchAlert.searchText}`
      : '?aumentarInfo=true',
  })
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_alertas'}
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

export default Alerts
