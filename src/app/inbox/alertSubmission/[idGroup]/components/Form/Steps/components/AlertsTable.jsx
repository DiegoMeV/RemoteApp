import { DynamicTableAlert, SearchTableWithRequest } from '@/app/applications/components'
import { useValueListAlertsColumns } from '../hooks'
import { Box } from '@mui/material'
import { alertsTableStyles, alertsTableContainer } from '@/app/inbox/requirements/[idGroup]/styles'

const AlertsTable = ({
  handleOpenEditAlert,
  alertsByProcess,
  loadingAlertsByProcess,
  apiRefExternal,
  searchAlertByProcess,
}) => {
  const columns = useValueListAlertsColumns({ handleOpenEditAlert })
  return (
    <Box
      sx={alertsTableContainer}
      minHeight='400px'
    >
      <SearchTableWithRequest searchOptions={searchAlertByProcess} />
      <Box sx={alertsTableStyles}>
        <DynamicTableAlert
          columns={columns ?? []}
          rows={alertsByProcess ?? []}
          loading={loadingAlertsByProcess ?? false}
          apiRefExternal={apiRefExternal}
          height='calc(50vh - 100px)'
        />
      </Box>
    </Box>
  )
}

export default AlertsTable
