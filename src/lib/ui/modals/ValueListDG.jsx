import { DataGridPremium, useGridApiContext } from '@mui/x-data-grid-premium'
import { CustomModal } from '.'
import { SearchTable } from '@/lib/components'
import { ClassicIconButton } from '../buttons'
import { CheckCircleOutline } from '@mui/icons-material'
import { Box } from '@mui/material'

const ValueListDG = (props) => {
  const selectOption = ({ params }) => {
    props.selectedOption(apiRef, props, params.row), props.openOptions.handleShow()
  }
  const apiRef = useGridApiContext()
  const columnSelect = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      return (
        <ClassicIconButton
          color='success'
          onClick={() => selectOption({ params })}
        >
          <CheckCircleOutline />
        </ClassicIconButton>
      )
    },
  }
  return (
    <CustomModal
      open={props.openOptions?.show}
      handleClose={() => {
        props.openOptions?.handleShow()
        props.searchOptions?.handleSearchText()
      }}
      title='Lista de valores'
      size='lg'
    >
      <SearchTable
        searchText={props.searchOptions?.searchText}
        onChange={props.searchOptions?.handleSearchText}
        clearSearch={props.searchOptions?.clearSearch}
      />
      <Box
        sx={{
          pt: 2,
          height: 'calc(100vh - 250px)',
        }}
      >
        <DataGridPremium
          columns={props.columns ? [...props.columns, columnSelect] : []}
          rows={props.rows ?? []}
          rowCount={props.pagination?.rowCountState ?? null}
          paginationMode={props.pagination ? 'server' : 'client'}
          paginationModel={props.pagination?.paginationModel ?? null}
          onPaginationModelChange={props.pagination?.handlePaginationModelChange ?? null}
          pagination
          loading={props.loading ?? false}
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

export default ValueListDG
