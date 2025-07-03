import { NoAccessCard } from '@/lib'
import { ViewAdmin } from './views'
import { AccessControl } from '@/libV4'

const Administration = () => {
  return (
    <AccessControl
      privilege='usuarios.administracion.opcion_administracion'
      nodeContent={<NoAccessCard />}
    >
      <ViewAdmin />
    </AccessControl>
  )
}

export default Administration
