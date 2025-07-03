import { usePrivileges } from '@/lib'
import { ViewRequests } from './view'

const RequestPage = () => {
  const privilegeRequestManagement = usePrivileges('procesos.consola.gestion_solicitudes')
  const privilegeManagementIndicators = usePrivileges('procesos.consola.estadisticas_cifras')
  const privilegeAnalyticsInformation = usePrivileges('procesos.consola.informacion_analitica')
  return (
    <ViewRequests
      privilegeRequestManagement={privilegeRequestManagement}
      privilegeManagementIndicators={privilegeManagementIndicators}
      privilegeAnalyticsInformation={privilegeAnalyticsInformation}
    />
  )
}

export default RequestPage
