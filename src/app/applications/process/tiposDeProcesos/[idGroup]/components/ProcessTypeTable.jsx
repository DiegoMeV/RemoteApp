import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import {
  CustomToolbarDatagrid,
  NoDataOverlay,
  SearchTable,
  getRowClassName,
  localeTextsEsp,
  useSearch,
} from '@/lib'
import { useProcessTypeTable } from '../hooks'
import { useStoreState } from 'easy-peasy'
import { useEffect } from 'react'

const ProcessTypeTable = ({ processTypes, isLoading }) => {
  const apiRef = useGridApiRef() // Create the API reference
  const dark = useStoreState((state) => state.darkTheme.dark)
  const { columns, rows } = useProcessTypeTable(processTypes)
  const slots = {
    toolbar: CustomToolbarDatagrid,
    loadingOverlay: LinearProgress,
    noRowsOverlay: NoDataOverlay,
  }

  const { searchText, handleSearchText } = useSearch()

  // This effect will be executed after the component has been mounted.
  useEffect(() => {
    // Function to adjust the size of columns
    const handleAutosizeColumns = () => {
      apiRef.current.autosizeColumns({ includeOutliers: true }) // Call the autosizeColumns function
    }

    // If the rows are available and the DataGrid is loaded, adjust columns
    if (rows.length && !isLoading) {
      handleAutosizeColumns()
    }
  }, [rows, isLoading, apiRef]) // Effect dependencies

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        rowGap: '20px',
        backgroundColor: 'backgroundGrey1',
        padding: '20px',
      }}
    >
      <Box>
        <SearchTable
          searchText={searchText}
          onChange={handleSearchText}
        />
      </Box>
      <Box sx={{ height: 'calc(100vh - 280px)', backgroundColor: 'backgroundWhite1' }}>
        <DataGridPremium
          apiRef={apiRef}
          columns={columns}
          rows={rows}
          pagination
          pageSizeOptions={[10, 20, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['options'],
            },
          }}
          loading={isLoading}
          getRowClassName={(params) => getRowClassName(dark, params)}
          localeText={localeTextsEsp}
          slots={slots}
        />
      </Box>
    </Box>
  )
}

export default ProcessTypeTable
