import { NotifyList } from '../components'
import { TitlePage, CardContentPage } from '../../components'

const ViewNotify = () => {
  return (
    <>
      <TitlePage
        title='Notificaciones'
        button={{ label: 'Búsqueda de expedientes' }}
      />
      <CardContentPage>
        <NotifyList />
      </CardContentPage>
    </>
  )
}

export default ViewNotify
