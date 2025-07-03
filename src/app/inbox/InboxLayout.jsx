import { Outlet } from 'react-router-dom'
import { WithAuth } from '../middleware'

const InboxLayout = () => {
  return (
    <WithAuth>
      <Outlet />
    </WithAuth>
  )
}

export default InboxLayout
