import { Box } from '@mui/material'
import AlertsTable from './AlertsTable'
import { FormGenericGridStyles } from '@/app/inbox/requirements/[idGroup]/styles'

const ContentAlerts = ({
  handleOpenEditAlert,
  alertsByProcess,
  loadingAlertsByProcess,
  apiRefExternal,
  searchAlertByProcess,
}) => {
  return (
    <Box
      sx={FormGenericGridStyles}
      p={2}
    >
      <AlertsTable
        handleOpenEditAlert={handleOpenEditAlert}
        alertsByProcess={alertsByProcess}
        loadingAlertsByProcess={loadingAlertsByProcess}
        apiRefExternal={apiRefExternal}
        searchAlertByProcess={searchAlertByProcess}
      />
    </Box>
  )
}

export default ContentAlerts
