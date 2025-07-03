import { NoDataOverlay, getRowClassName, localeTextsEsp, resizeColumns } from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { containerDinamicAlertTable } from './styles'
import { useEffect } from 'react'

const DynamicTableAlert = ({
  columns,
  rows,
  loading,
  paginationModel,
  rowCount,
  handlePaginationModelChange,
  toolbar,
  toolbarProps,
  rowId,
  apiRefExternal,
  height,
  getRowHeight,
}) => {
  const apiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)

  useEffect(() => {
    resizeColumns(apiRefExternal ?? apiRef, loading)
  }, [rows, apiRefExternal, apiRef, loading])

  return (
    <Box
      component='div'
      sx={containerDinamicAlertTable}
      height={height ?? '92%'}
    >
      <DataGridPremium
        apiRef={apiRefExternal ?? apiRef}
        rows={rows}
        columns={columns}
        getRowHeight={getRowHeight}
        getRowClassName={(params) => getRowClassName(dark, params)}
        rowCount={rowCount ?? null}
        getRowId={rowId ?? null}
        paginationMode={paginationModel ? 'server' : 'client'}
        paginationModel={paginationModel ?? undefined}
        onPaginationModelChange={handlePaginationModelChange ?? null}
        pagination
        loading={loading ?? false}
        initialState={{
          pagination: { paginationModel: { pageSize: 50 } },
          pinnedColumns: {
            right: ['habilitar_boton', 'activo', 'isActive', 'options', 'requerido'],
          },
        }}
        pageSizeOptions={[10, 25, 50, 100]}
        localeText={localeTextsEsp}
        slots={{
          toolbar: toolbar,
          noRowsOverlay: NoDataOverlay,
          loadingOverlay: LinearProgress,
        }}
        slotProps={{ toolbar: toolbarProps }}
        sx={{ backgroundColor: 'backgroundWhite1', minHeight: '300px' }}
      />
    </Box>
  )
}

export default DynamicTableAlert
