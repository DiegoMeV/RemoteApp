import { CustomSearchDatagrid, NoDataOverlay } from '@/lib'
import { LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { columnsAlertDetail } from '../constants'

const ViewDetailAlert = ({ loading, infoAlerts }) => {
  const rowsWithUniqueIds = infoAlerts?.map((alert, index) => ({
    ...alert,
    idTable: `${alert.id}-${index}`,
  }))
  return (
    <DataGridPremium
      columns={columnsAlertDetail}
      rows={rowsWithUniqueIds ?? []}
      autoHeight
      getRowId={(row) => row.idTable}
      loading={loading}
      slots={{
        toolbar: CustomSearchDatagrid,
        loadingOverlay: LinearProgress,
        noRowsOverlay: NoDataOverlay,
      }}
    />
  )
}

export default ViewDetailAlert
