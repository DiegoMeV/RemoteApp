import { AccessControl, NoAccessCard } from '@/libV4'
import { ViewDashboard } from './views'
import { WithAuth } from '@/app/middleware'

const AuditDashboard = () => {
  return (
    <WithAuth>
      <AccessControl
        privilege='fiscaliza.modulo.visualizar'
        nodeContent={<NoAccessCard />}
      >
        <ViewDashboard />
      </AccessControl>
    </WithAuth>
  )
}

export default AuditDashboard
