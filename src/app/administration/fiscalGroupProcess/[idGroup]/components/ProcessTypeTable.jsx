import { Box, LinearProgress } from '@mui/material'
import { CustomToolbarDatagrid, GenericTable, NoDataOverlay, SearchTable, useSearch } from '@/lib'
import { useProcessTypeTable } from '../hooks'

const ProcessTypeTable = ({ processTypes, isLoading }) => {
  const { columns, rows } = useProcessTypeTable(processTypes)
  const slots = {
    toolbar: CustomToolbarDatagrid,
    loadingOverlay: LinearProgress,
    noRowsOverlay: NoDataOverlay,
  }

  const { searchText, handleSearchText } = useSearch()

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
        <GenericTable
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
          slots={slots}
        />
      </Box>
    </Box>
  )
}

export default ProcessTypeTable
