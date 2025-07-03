import { AccessControl, NoAccessCard } from '@/libV4'
import { ViewGroupProcess } from './views'

const GroupProcess = () => {
  return (
    <AccessControl
      privilege='procesos.grupos_procesos.visualizar_tipos'
      nodeContent={<NoAccessCard />}
    >
      <ViewGroupProcess />
    </AccessControl>
  )
}

export default GroupProcess
