import { DataGridPremium } from '@mui/x-data-grid-premium'
import { CustomModal } from '.'
import { SearchTable } from '@/lib/components'
import { ClassicIconButton } from '../buttons'
import { CheckCircleOutline } from '@mui/icons-material'
import { Box } from '@mui/material'

const ValueListGroup = ({
  openOptions,
  columns,
  rows,
  loading,
  searchOptions,
  selectedOption = () => {},
  pagination,
  size,
}) => {
  const onclickSelect = (params) => {
    selectedOption(params.row)
    openOptions.handleShow()
  }
  const columnSelect = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      if (typeof params.row === 'object' && Object.keys(params.row).length > 0) {
        return (
          <ClassicIconButton
            color='success'
            onClick={() => onclickSelect(params)}
          >
            <CheckCircleOutline />
          </ClassicIconButton>
        )
      }
      return null
    },
  }
  return (
    <CustomModal
      open={openOptions?.show}
      handleClose={openOptions?.handleShow}
      title='Lista de valores'
      size={size ? size : 'lg'}
    >
      <SearchTable
        searchText={searchOptions?.searchText}
        onChange={searchOptions?.handleSearchText}
        clearSearch={searchOptions?.clearSearch}
      />
      <Box
        sx={{
          pt: 2,
          height: 'calc(100vh - 300px)',
        }}
      >
        <DataGridPremium
          columns={columns ? [...columns, columnSelect] : []}
          rows={rows ?? []}
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
            rowGrouping: {
              model: ['hierarchy'],
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </Box>
    </CustomModal>
  )
}

export default ValueListGroup
