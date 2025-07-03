import { Box } from '@mui/material'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { CustomModal, useValueListRequest } from '.'
import { resizeColumns } from '@/lib/funcs'
import { useEffect } from 'react'
import { CheckCircleOutline, Clear } from '@mui/icons-material'
import { ClassicIconButton } from '../buttons'
import { GenericTextfield } from '../genericInputs'
import { usePaginationModelParams } from '../datagrid'

const ValueListRequest = () => {
  const valueList = useStoreState((state) => state.valueList.VLProps)
  const handleShow = useStoreActions((actions) => actions.valueList.handleClose)
  const toggleDisabled = valueList?.toggleDisabled
  const selectedOption = valueList?.selectedOption
  const columns = valueList?.columns
  const open = valueList?.open
  const title = valueList?.title
  const shouldClose = valueList?.shouldClose ?? true
  const searchOptions = valueList?.searchOptions
  const dgProps = valueList?.dgProps
  const usePagination = valueList?.usePagination
  const paginationType = valueList?.paginationType
  const hasQuerySearch = valueList?.hasQuerySearch

  const {
    searchParam,
    setCursor,
    paginationModel,
    setPaginationModel,
    handlePaginationModelChangePage,
    rowCountStatePage,
    rows,
    loading,
    rowsRequest,
    handleClearPaginationModel,
  } = useValueListRequest(valueList)

  const apiRef = useGridApiRef()

  const {
    handlePaginationModelChange: handlePaginationModelChangeCursor,
    rowCountState: rowCountStateCursor,
  } = usePaginationModelParams(
    rowsRequest?.data ?? valueList?.rows,
    loading,
    setCursor,
    paginationModel,
    setPaginationModel
  )

  const handlePaginationModelChange =
    paginationType === 'page' ? handlePaginationModelChangePage : handlePaginationModelChangeCursor

  const rowCountState = paginationType === 'page' ? rowCountStatePage : rowCountStateCursor

  const columnSelect = {
    field: 'options',
    headerName: '',
    width: 60,
    renderCell: (params) => {
      return (
        <ClassicIconButton
          disabled={toggleDisabled?.(params?.row?.id, params)}
          color='success'
          onClick={() => {
            selectedOption?.(params)
            if (shouldClose) {
              handleShow?.()
            }
          }}
        >
          <CheckCircleOutline />
        </ClassicIconButton>
      )
    },
  }

  useEffect(() => {
    resizeColumns(apiRef, loading)
  }, [rows, apiRef, loading])

  useEffect(() => {
    if (open) {
      searchParam?.clearSearch()
      handleClearPaginationModel()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  return (
    <CustomModal
      open={open ?? false}
      handleClose={() => {
        handleShow()
        searchOptions?.handleSearchText('')
      }}
      height='calc(100vh - 150px)'
      title={`Lista de valores ${title ? `- ${title}` : ''}`}
      size='lg'
    >
      {hasQuerySearch && (
        <GenericTextfield
          label='Buscar'
          value={searchParam?.searchText ?? ''}
          onChange={(e) => searchParam?.handleSearchText(e.target.value)}
          InputProps={{
            endAdornment: (
              <ClassicIconButton
                color='secondary'
                onClick={() => searchParam?.clearSearch('')}
              >
                <Clear />
              </ClassicIconButton>
            ),
          }}
        />
      )}
      <Box
        sx={{
          pt: 2,
          height: '90%',
        }}
      >
        <DataGridPremium
          apiRef={apiRef}
          columns={rowsRequest?.isFetching ? [] : columns ? [...columns, columnSelect] : []}
          autosizeOptions={{
            includeHeaders: true,
            includeOutliers: true,
          }}
          autosizeOnMount={true}
          rows={rows ?? []}
          paginationMode={usePagination ? 'server' : 'client'}
          onPaginationModelChange={usePagination ? handlePaginationModelChange : null}
          paginationModel={usePagination ? paginationModel : undefined}
          pagination
          rowCount={rowCountState ?? rows?.length ?? 0}
          loading={loading ?? false}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['habilitar_boton', 'isActive', 'options'],
            },
          }}
          pageSizeOptions={[10, 25, 50, 100]}
          {...dgProps}
        />
      </Box>
    </CustomModal>
  )
}

export default ValueListRequest
