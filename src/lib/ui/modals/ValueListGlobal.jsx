import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { CustomModal } from '.'
import { SearchTable } from '@/lib/components'
import { ClassicIconButton } from '../buttons'
import { CheckCircleOutline } from '@mui/icons-material'
import { Box, Button } from '@mui/material'
import { useEffect } from 'react'
import { resizeColumns } from '@/lib/funcs'

const ValueListGlobal = ({
  title,
  openOptions,
  columns,
  rows,
  loading,
  searchOptions,
  selectedOption = () => {},
  pagination,
  toggleDisabled = () => {},
  shouldClose = true,
  getRowId,
  tooltipOption = () => {},
  handleSearch,
  ...props
}) => {
  const apiRef = useGridApiRef()
  const columnSelect = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      return (
        <ClassicIconButton
          disabled={toggleDisabled(params)}
          color='success'
          title={tooltipOption(params)}
          onClick={() => {
            selectedOption(params)
            if (shouldClose) {
              openOptions?.handleShow()
            }
          }}
        >
          <CheckCircleOutline />
        </ClassicIconButton>
      )
    },
  }

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearch(searchOptions?.searchText)
    }
  }

  useEffect(() => {
    resizeColumns(apiRef, loading)
  }, [rows, apiRef, loading])

  const getRowIdDefault = (row) => row.id

  return (
    <CustomModal
      open={openOptions?.show}
      handleClose={() => {
        openOptions?.handleShow()
        searchOptions?.handleSearchText('')
      }}
      height='calc(100vh - 150px)'
      title={`Lista de valores ${title ? `- ${title}` : ''}`}
      size='lg'
    >
      <div className='flex gap-4'>
        <SearchTable
          searchText={searchOptions?.searchText}
          onChange={searchOptions?.handleSearchText}
          clearSearch={searchOptions?.clearSearch}
          width='85%'
          handleKeyDown={handleSearch ? handleKeyPress : undefined}
        />
        {handleSearch && (
          <Button
            variant='contained'
            sx={{ width: '12%', maxWidth: '200px' }}
            onClick={() => handleSearch?.(searchOptions?.searchText)}
          >
            Buscar
          </Button>
        )}
      </div>
      <Box
        sx={{
          pt: 2,
          height: '90%',
        }}
      >
        <DataGridPremium
          apiRef={apiRef}
          columns={columns ? [...columns, columnSelect] : []}
          getRowId={getRowId ?? getRowIdDefault}
          getRowHeight={() => 'auto'}
          autosizeOptions={{
            includeHeaders: true,
            includeOutliers: true,
          }}
          autosizeOnMount={true}
          rows={rows ?? []}
          rowCount={pagination?.rowCountState ?? rows?.length ?? 0} // Asegurar que rowCount esté definido
          paginationMode={pagination ? 'server' : 'client'}
          paginationModel={pagination?.paginationModel ?? undefined}
          onPaginationModelChange={pagination?.handlePaginationModelChange ?? null}
          pagination
          loading={loading ?? false}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['habilitar_boton', 'isActive', 'options'],
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          {...props}
        />
      </Box>
    </CustomModal>
  )
}

export default ValueListGlobal
