import { ViewNotifyById } from './view'
import { useParams } from 'react-router-dom'
import { useColumnsData } from './hooks/useColumnsData'

const NotifyById = () => {
  const { idNotify } = useParams()
  const { columns, modals } = useColumnsData()

  return (
    <>
      <ViewNotifyById
        idNotify={idNotify}
        columns={columns}
        modals={modals}
      />
    </>
  )
}

export default NotifyById
