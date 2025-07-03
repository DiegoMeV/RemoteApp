import { TableComponent } from '../components'
import { TitleAlerts } from '../../components'
import { NoAccessCard } from '@/lib'
import { AccessControl } from '@/libV4'

const ViewRegistryRethus = ({ infoTable }) => {
  return (
    <AccessControl
      privilege={'rethus.opciones.visualizar_rethus'}
      renderNoAccess={() => <NoAccessCard />}
    >
      <TitleAlerts
        title='Registro de archivo plano'
        backpath='/applications'
      />
      <TableComponent {...infoTable} />
    </AccessControl>
  )
}

export default ViewRegistryRethus
