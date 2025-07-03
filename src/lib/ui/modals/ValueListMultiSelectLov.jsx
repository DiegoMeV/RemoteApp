import { DataGridPremium } from '@mui/x-data-grid-premium'
import { CustomModal } from '.'
import { Box, Button, Checkbox } from '@mui/material'
import { SearchTable } from '@/lib/components'
import { useState } from 'react'

const ValueListMultiSelectLov = ({
  openOptions,
  columns,
  rows,
  loading,
  pagination,
  size,
  setValue,
  searchOptions,
  name,
  defaultSelected,
}) => {
  const [selectedRows, setSelectedRows] = useState(defaultSelected ?? [])
  const onClickClose = () => {
    openOptions.handleShow()
  }

  const onClickSelect = (row) => {
    if (selectedRows.find((selectedRow) => selectedRow.id === row.id)) {
      setSelectedRows(selectedRows.filter((selectedRow) => selectedRow.id !== row.id))
    } else {
      setSelectedRows([...selectedRows, row])
    }
  }

  const onClickSave = () => {
    setValue(name, selectedRows)
  }

  const columnSelect = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      const isSelected = selectedRows?.some((row) => row?.id === params?.row?.id)
      return (
        <Checkbox
          color='success'
          checked={isSelected}
          onClick={() => onClickSelect(params?.row)}
        />
      )
    },
  }
  return (
    <CustomModal
      open={openOptions?.show}
      handleClose={openOptions?.handleShow}
      title='Firmantes'
      size={size ? size : 'lg'}
    >
      <Box
        sx={{
          pt: 2,
          height: 'calc(100vh - 300px)',
        }}
      >
        <Box pb={2}>
          <SearchTable
            searchText={searchOptions.searchText}
            onChange={searchOptions.handleSearchText}
            clearSearch={searchOptions.clearSearch}
          />
        </Box>

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
            pagination: { paginationModel: { pageSize: 25 } },
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
      <Box
        display='flex'
        justifyContent='flex-end'
        mt={7}
        gap={2}
      >
        <Button
          color='secondary'
          variant='contained'
          onClick={onClickClose}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          type='submit'
          onClick={() => {
            onClickSave()
            onClickClose()
          }}
        >
          Guardar
        </Button>
      </Box>
    </CustomModal>
  )
}

export default ValueListMultiSelectLov
