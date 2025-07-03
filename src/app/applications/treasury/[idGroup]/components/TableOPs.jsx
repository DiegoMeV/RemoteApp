import { getRowClassName, NoDataOverlay, resizeColumns } from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const TableOPs = ({
  apiRef,
  rows,
  columns,
  loading,
  paymentOrders,
  paginationModel,
  handlePaginationModelChange,
  idGroup,
}) => {
  const setPaymentOrders = useStoreActions((actions) => actions.paymentOrdersModel.setPaymentOrders)
  const dark = useStoreState((state) => state.darkTheme.dark)

  useEffect(() => {
    resizeColumns(apiRef, loading)
  }, [rows, apiRef, loading])

  const handleRowSelectionChange = (newSelection) => {
    if (!loading) {
      setPaymentOrders({ idGroup, newSelection })
    }
  }

  return (
    <Box
      component='div'
      height='calc(80vh - 100px)'
      bgcolor='backgroundWhite1'
    >
      <DataGridPremium
        apiRef={apiRef}
        rows={rows?.data ?? []}
        columns={columns ?? []}
        loading={loading}
        rowCount={rows?.totalRows ?? 0}
        pagination
        paginationMode={paginationModel ? 'server' : 'client'}
        paginationModel={paginationModel ?? undefined}
        onPaginationModelChange={handlePaginationModelChange ?? null}
        getRowId={(row) => `${row.nrodoc}-${row.orden}`}
        getRowClassName={(params) => getRowClassName(dark, params)}
        checkboxSelection
        disableRowSelectionOnClick
        onRowSelectionModelChange={handleRowSelectionChange}
        rowSelectionModel={paymentOrders?.[idGroup] ?? []}
        pageSizeOptions={[10, 25, 50, 100]}
        initialState={{
          pagination: { paginationModel: { pageSize: 25 } },
          pinnedColumns: {
            right: ['options'],
          },
        }}
        slots={{
          loadingOverlay: LinearProgress,
          noRowsOverlay: NoDataOverlay,
        }}
      />
    </Box>
  )
}

export default TableOPs
