// DEPRECATED

import Box from '@mui/material/Box'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { NoDataOverlay, getRowClassName } from '@/lib'
import { sxAccordionStyles } from '../styles'
import { LinearProgress } from '@mui/material'

const TableChooseDocument = ({
  loading,
  columns,
  rows,
  handlePaginationModelChange,
  rowCountState,
  paginationModel,
}) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  return (
    <Box sx={sxAccordionStyles.contenTableModal}>
      <DataGridPremium
        rows={rows}
        columns={columns}
        loading={loading ?? false}
        pagination
        pageSizeOptions={[10, 20, 50, 100]}
        rowCount={rowCountState}
        paginationMode='server'
        onPaginationModelChange={handlePaginationModelChange}
        paginationModel={paginationModel}
        getRowClassName={(params) => getRowClassName(dark, params)}
        slots={{
          noRowsOverlay: NoDataOverlay,
          loadingOverlay: LinearProgress,
        }}
        initialState={{
          pagination: { paginationModel: { pageSize: 50 } },
          pinnedColumns: {
            right: ['options'],
          },
        }}
        sx={{ backgroundColor: 'backgroundWhite1' }}
      />
    </Box>
  )
}
export default TableChooseDocument
