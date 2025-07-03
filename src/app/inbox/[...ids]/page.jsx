import { AccessControl } from '@/libV4'
import useManagement from './hooks/useManagement'
import { ViewManagement } from './views'
import { NoAccessCard } from '@/lib'
import { useParams } from 'react-router-dom'

const Management = () => {
  const { idProcess, idActivity } = useParams()
  const params = { ids: [idProcess, idActivity] }
  const dataManagement = useManagement(params)

  return (
    <AccessControl
      privilege='procesos.proceso.visualizar_datos_basicos'
      nodeContent={<NoAccessCard />}
    >
      <ViewManagement
        ids={params.ids}
        dataManagement={dataManagement}
      />
    </AccessControl>
  )
}

export default Management
