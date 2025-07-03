import { useApplicationsInfo } from '@/lib'
import { ViewIdApplication } from './views'
import { useColumns } from './hooks'
import { useNavigate, useParams } from 'react-router-dom'

const IdApplication = () => {
  const { idApplication } = useParams()
  const navigate = useNavigate()
  const { data: dataApplication, isLoading } = useApplicationsInfo({ id: idApplication })

  const title = dataApplication?.data?.[0]?.name || ''

  const rows = dataApplication?.data?.[0]?.groups || []
  const columns = useColumns(dataApplication)
  const addNewData = () => {
    navigate(`/applications/process/editProcessTypeGroups/${idApplication}/new`)
  }
  return (
    <ViewIdApplication
      title={title}
      columns={columns || []}
      rows={rows || []}
      loading={isLoading}
      addNewData={addNewData}
    />
  )
}

export default IdApplication
