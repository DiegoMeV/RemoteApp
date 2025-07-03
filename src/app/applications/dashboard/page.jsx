import { AccessControl } from '@/libV4'
import { ViewDashboardAlert } from './view'
import { NoAccessCard } from '@/lib'

const DashboardPage = () => {
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_dashboard'
      nodeContent={<NoAccessCard />}
    >
      <ViewDashboardAlert />
    </AccessControl>
  )
}

export default DashboardPage
