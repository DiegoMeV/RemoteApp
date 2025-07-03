import { Box, Grid, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { ChartContainer, NoDataOverlay, localeTextsEsp } from '@/lib'
import { columnsSearchTable } from '../../../../dashboard/constants'
import { usePaginationInbox } from '@/app/inbox/hooks'

const TableRequestManagement = ({
  loading,
  rowsFiltered,
  setSkip,
  pageSize,
  setPageSize,
  info,
}) => {
  const columns = columnsSearchTable()
  const paramsFilter = {
    setSkip: setSkip,
    pageSize,
    setPageSize: setPageSize,
  }

  const { handlePaginationModelChange, rowCountState, paginationModel } = usePaginationInbox(
    info,
    paramsFilter
  )
  return (
    <Grid
      item
      xs={12}
    >
      <ChartContainer title='Resultados de la búsqueda'>
        <Box height={500}>
          <DataGridPremium
            loading={loading}
            columns={columns ?? []}
            rows={rowsFiltered ?? []}
            slotProps={{ toolbar: { showQuickFilter: true } }}
            localeText={localeTextsEsp}
            onPaginationModelChange={handlePaginationModelChange}
            rowCount={rowCountState}
            paginationModel={paginationModel}
            pagination
            pageSizeOptions={[10, 25, 50, 100]}
            paginationMode='server'
            initialState={{
              pagination: { paginationModel: { pageSize: 50 } },
            }}
            slots={{
              noRowsOverlay: NoDataOverlay,
              loadingOverlay: LinearProgress,
            }}
          />
        </Box>
      </ChartContainer>
    </Grid>
  )
}

export default TableRequestManagement
