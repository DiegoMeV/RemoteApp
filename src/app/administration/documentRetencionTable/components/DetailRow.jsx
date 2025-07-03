import { getRowClassName, resizeColumns, useQueryDynamicApi } from '@/lib'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect } from 'react'
import { Box } from '@mui/system'
import { Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'

const DetailRow = ({ qry, pl, columns, getDetailPanelContent }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const apiRef2 = useGridApiRef()

  const { data: rows, isFetching: loadingRows } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlDocuments',
    url: qry,
  })

  useEffect(() => {
    resizeColumns(apiRef2, loadingRows)
  }, [apiRef2, loadingRows])

  return (
    <Stack
      sx={{
        height: '100%',
        boxSizing: 'border-box',
        '& .MuiDataGrid-row  , .MuiDataGrid-columnHeaders ': {
          pl: pl,
        },
        '& .MuiDataGrid-pinnedColumns ': {
          boxShadow: 'none',
        },
      }}
      direction='column'
    >
      {(rows?.data?.length === 0 || !rows) && !loadingRows ? (
        <Box sx={{ p: 2 }}>No hay registros</Box>
      ) : (
        <DataGridPremium
          apiRef={apiRef2}
          rows={rows?.data ?? []}
          columns={columns ?? []}
          loading={loadingRows}
          getRowClassName={(params) => getRowClassName(dark, params)}
          getDetailPanelContent={getDetailPanelContent ?? null}
          getDetailPanelHeight={() => 'auto'}
          initialState={{
            pinnedColumns: {
              right: ['options'],
            },
          }}
          hideFooter
        />
      )}
    </Stack>
  )
}

export default DetailRow
