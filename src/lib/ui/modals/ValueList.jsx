import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { CustomModal } from '.'
import { SearchTable } from '@/lib/components'
import { ClassicIconButton } from '../buttons'
import { CheckCircleOutline } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { searchRows } from '@/app/applications/hooks'
import { resizeColumns } from '@/lib/funcs'

const ValueList = ({
  openOptions,
  columns,
  rows,
  loading,
  searchOptions,
  selectedOption = () => {},
  pagination,
  toggleDisabled = () => {},
}) => {
  const [filteredRows, setFilteredRows] = useState([])
  const apiRef = useGridApiRef()
  const columnSelect = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      return (
        <ClassicIconButton
          disabled={toggleDisabled(params.row)}
          color='success'
          onClick={() => {
            selectedOption(params.row), openOptions.handleShow(), searchOptions?.clearSearch('')
          }}
        >
          <CheckCircleOutline />
        </ClassicIconButton>
      )
    },
  }
  useEffect(() => {
    searchRows(searchOptions?.searchText, rows, setFilteredRows)
  }, [searchOptions?.searchText, rows])

  useEffect(() => {
    resizeColumns(apiRef, loading)
  }, [rows, loading, apiRef])

  return (
    <CustomModal
      open={openOptions?.show}
      handleClose={() => {
        openOptions?.handleShow()
        searchOptions?.handleSearchText()
      }}
      height='calc(100vh - 150px)'
      title='Lista de valores'
      size='lg'
    >
      <SearchTable
        searchText={searchOptions?.searchText}
        onChange={searchOptions?.handleSearchText}
        clearSearch={searchOptions?.clearSearch}
      />
      <Box
        sx={{
          pt: 2,
          height: 'calc(100vh - 230px)',
        }}
      >
        <DataGridPremium
          apiRef={apiRef}
          columns={columns ? [...columns, columnSelect] : []}
          rows={rows ?? filteredRows ?? []}
          rowCount={pagination?.rowCountState ?? null}
          paginationMode={pagination ? 'server' : 'client'}
          paginationModel={pagination?.paginationModel ?? null}
          onPaginationModelChange={pagination?.handlePaginationModelChange ?? null}
          pagination
          loading={loading ?? false}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['options'],
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </Box>
    </CustomModal>
  )
}

export default ValueList
