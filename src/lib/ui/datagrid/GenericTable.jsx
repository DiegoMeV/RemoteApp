import { NoDataOverlay, getRowClassName, localeTextsEsp, resizeColumns } from '@/lib'
import { LinearProgress } from '@mui/material'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { memo, useEffect } from 'react'

const GenericTable = ({
  apiRef,
  columns = [],
  rows = [],
  loading = false,
  toolbar,
  toolbarProps,
  ...rest
}) => {
  const localApiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)

  useEffect(() => {
    resizeColumns(apiRef ?? localApiRef, loading)
  }, [rows, localApiRef, loading, apiRef])

  return (
    <DataGridPremium
      apiRef={localApiRef}
      rows={rows}
      columns={columns}
      autosizeOnMount={true}
      autosizeOptions={{
        includeHeaders: true,
        includeOutliers: true,
      }}
      getRowClassName={(params) => getRowClassName(dark, params)}
      loading={loading ?? false}
      initialState={{
        pagination: { paginationModel: { pageSize: 50 } },
        pinnedColumns: { right: ['options'] },
        ...rest?.initialState,
      }}
      pageSizeOptions={[10, 25, 50, 100]}
      localeText={localeTextsEsp}
      slots={{
        toolbar: toolbar,
        noRowsOverlay: NoDataOverlay,
        loadingOverlay: LinearProgress,
        ...rest?.slots,
      }}
      slotProps={{ toolbar: toolbarProps, ...rest?.slotProps }}
      {...rest}
      sx={{ backgroundColor: 'backgroundWhite1', minHeight: '300px', ...rest?.sx }}
    />
  )
}

export default memo(GenericTable)
