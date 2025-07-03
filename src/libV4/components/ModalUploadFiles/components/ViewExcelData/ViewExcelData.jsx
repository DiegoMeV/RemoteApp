import { useStoreState } from 'easy-peasy'
import { columnsTable } from './funcs'
import { getRowClassName, localeTextsEsp, NoDataOverlay } from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'

const ViewExcelData = ({ rowsFile, columnsFile }) => {
  const columns = columnsTable({ columnsFile })
  const rowsWithId = rowsFile.map((row, index) => ({
    id: row.id || `row-${index}`, // Si no hay 'id', se asigna uno basado en el índice
    ...row,
  }))
  const dark = useStoreState((state) => state.darkTheme.dark)

  return (
    <>
      <Box
        height='50vh'
        bgcolor='#fff'
      >
        <DataGridPremium
          rows={rowsWithId ?? []}
          columns={columns}
          slots={{
            noRowsOverlay: NoDataOverlay, // To show a custom overlay when no rows are displayed
            loadingOverlay: LinearProgress, // To show a linear progress indicator when loading
          }}
          localeText={localeTextsEsp} // translations for the table
          pageSizeOptions={[25, 50, 100]}
          disableRowSelectionOnClick
          getRowClassName={(params) => getRowClassName(dark, params)}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 25,
              },
            },
          }}
        />
      </Box>
    </>
  )
}

export default ViewExcelData
