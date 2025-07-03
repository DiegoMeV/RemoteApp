import { useGetAllParams } from '@/lib'
import { ViewSendsAlerts } from './views'

const AlertsSender = () => {
  const params = useGetAllParams()
  const idGroup = params?.idGroup ?? null
  const idProcess = params?.idProcess ?? null
  return (
    <ViewSendsAlerts
      idGroup={idGroup}
      idProcess={idProcess}
    />
  )
}

export default AlertsSender
