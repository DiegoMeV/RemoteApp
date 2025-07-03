import {
  BackdropLoading,
  CustomToolbarDatagrid,
  NoDataOverlay,
  SearchTable,
  getRowClassName,
  localeTextsEsp,
  resizeColumns,
} from '@/lib'
import { DataGridPremium } from '@mui/x-data-grid-premium'
import { Box, LinearProgress } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useEffect, useState } from 'react'
import { searchRows } from '../hooks'

const MembersTable = ({
  isLoading,
  dataMembers,
  searchUser,
  buttons,
  processRowUpdate,
  loadingRequests,
}) => {
  const [filteredRows, setFilteredRows] = useState([])
  useEffect(() => {
    searchRows(searchUser?.searchText, dataMembers?.rows, setFilteredRows)
  }, [searchUser?.searchText, dataMembers?.rows])

  useEffect(() => {
    resizeColumns(dataMembers.refDatagrid, loadingRequests)
  }, [dataMembers?.rows, loadingRequests, dataMembers.refDatagrid])
  const dark = useStoreState((state) => state.darkTheme.dark)
  return (
    <Box sx={{ height: 'calc(100vh - 220px)', width: '100%' }}>
      <BackdropLoading loading={loadingRequests} />
      <DataGridPremium
        apiRef={dataMembers.refDatagrid}
        rows={filteredRows ?? dataMembers?.rows ?? []}
        columns={dataMembers?.columns ?? []}
        rowModesModel={dataMembers?.rowModesModel}
        editMode='row'
        pagination
        paginationMode='client'
        pageSizeOptions={[10, 20, 50, 100]}
        processRowUpdate={processRowUpdate}
        getRowClassName={(params) => getRowClassName(dark, params)}
        initialState={{
          pagination: { paginationModel: { pageSize: 50 } },
          pinnedColumns: {
            right: ['isActive', 'options'],
          },
        }}
        loading={isLoading}
        localeText={localeTextsEsp}
        slots={{
          toolbar: CustomToolbarDatagrid,
          loadingOverlay: LinearProgress,
          noRowsOverlay: NoDataOverlay,
        }}
        slotProps={{
          toolbar: {
            otherOptions: (
              <SearchTable
                searchText={searchUser?.searchText}
                onChange={searchUser?.handleSearchText}
                clearSearch={searchUser?.clearSearch}
              />
            ),
            buttons: buttons,
          },
        }}
        sx={{ backgroundColor: 'backgroundWhite1' }}
      />
    </Box>
  )
}

export default MembersTable
