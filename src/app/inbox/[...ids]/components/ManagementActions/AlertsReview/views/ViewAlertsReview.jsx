import { NoDataOverlay } from '@/lib'
import { LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'

const ViewAlertsReview = ({ columns, rows, models, isLoading, processRowUpdate }) => {
  const { rowModesModels } = models

  return (
    <DataGridPremium
      loading={isLoading}
      slots={{
        loadingOverlay: LinearProgress,
        noRowsOverlay: NoDataOverlay,
      }}
      rowModesModel={rowModesModels}
      rows={rows}
      editMode='row'
      processRowUpdate={processRowUpdate}
      columns={columns}
      rowHeight={80}
      pagination
      sx={{ backgroundColor: 'backgroundWhite1' }}
      initialState={{
        pinnedColumns: {
          right: ['options'],
        },
      }}
    />
  )
}

export default ViewAlertsReview
