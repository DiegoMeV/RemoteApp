import { WithAuth } from '../middleware'
import { ViewDashboard } from './views'

const Dashboard = () => {
  return (
    <WithAuth>
      <ViewDashboard />
    </WithAuth>
  )
}

export default Dashboard
