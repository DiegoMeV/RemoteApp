import { NoDataOverlay, localeTextsEsp, resizeColumns } from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { containerDinamicAlertTable } from '../styles'
import { useEffect, useRef } from 'react'

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
  ...rest
}) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const apiRef = useRef()
  const getRowClassName = (params) => {
    return params.indexRelativeToCurrentPage % 2 !== 0
      ? ''
      : dark === 'dark'
      ? 'colorRowDarkMode'
      : 'gray-row' // Asigna la clase CSS solo a las filas impares
  }
  useEffect(() => {
    resizeColumns(apiRef, loading)
  }, [rows, loading, apiRef])
  return (
    <Box
      component='div'
      sx={containerDinamicAlertTable}
    >
      <DataGridPremium
        apiRef={apiRef}
        rows={rows || []}
        columns={columns || []}
        getRowClassName={getRowClassName}
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
            right: ['activo', 'isActive', 'options', 'requerido'],
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
        sx={{ backgroundColor: 'backgroundWhite1' }}
        {...rest}
      />
    </Box>
  )
}

export default DynamicTableAlert
