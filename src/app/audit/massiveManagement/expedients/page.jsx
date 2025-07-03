import { useQueryDynamicApi } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsTable } from './constants'
import { ViewMassiveExpedients } from './view'

const MassiveExpedients = () => {
  const navigate = useNavigate()
  const handleModalCreate = () => {
    navigate('/audit/massiveManagement/expedients/create')
  }
  const {
    data: massiveActivities,
    isFetching: loadingInspectionPlans,
    isError: errorInspectionPlans,
  } = useQueryDynamicApi({
    url: `/massive-activities`,
    isCompanyRequest: true,
    baseKey: 'urlFiscalizacion',
  })
  const columns = columnsTable({ navigate })
  return (
    <ViewMassiveExpedients
      handleModalCreate={handleModalCreate}
      rows={massiveActivities?.data}
      columns={columns}
      loading={loadingInspectionPlans}
      error={errorInspectionPlans}
    />
  )
}

export default MassiveExpedients
