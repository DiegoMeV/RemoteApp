import { getRowClassName, localeTextsEsp, SearchTable, useBoolean } from '@/lib'
import { columnsDetailPayrollLiquidation } from '../constants'
import { DataGridPremium, useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { Button } from '@mui/material'
import { useEffect } from 'react'
import { BasicTitle, CustomModal, resizeColumns } from '@/libV4'
import { VolantePago } from '../../../components'

const DetailTable = ({
  jobStatusData,
  componentForm,
  isNew,
  isLiquidated,
  infoDetail,
  infoVolante,
  isPendingQuery,
  handleGetDetail,
  handleGetVolante,
  handleConfirmLiquidate,
  rowSelectionModel,
  setRowSelectionModel,
  setRowsChanged,
  searchDetail = {},
  pagination,
  arePendingChanges,
  initialLiquidationState,
}) => {
  const apiRef = useGridApiRef()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const volantePagoModal = useBoolean()

  const columns = columnsDetailPayrollLiquidation({
    volantePagoModal,
    handleGetVolante,
  })

  const handleKeyDown = (e) => {
    e.key === 'Enter' && handleGetDetail?.(searchDetail?.searchText)
  }

  const handleClearSearch = () => {
    searchDetail?.clearSearch()
    handleGetDetail('')
  }

  useEffect(() => {
    if (infoDetail) {
      infoDetail.forEach((row) => {
        const tercero = row?.tercero
        if (!(tercero in initialLiquidationState.current)) {
          initialLiquidationState.current[tercero] = row?.liquidar_actual
        }
      })

      const initiallySelected = infoDetail
        .filter((row) => row?.liquidar_actual === 'S')
        .map((row) => row?.tercero)

      setRowSelectionModel((prev) => {
        if (!prev || prev.length === 0) {
          return initiallySelected
        }
        const merged = new Set([...prev, ...initiallySelected])
        return Array.from(merged)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoDetail])

  const handleRowSelectionChange = (newSelectionModel) => {
    const updatedRowsChanged = []

    if (infoDetail) {
      newSelectionModel.forEach((tercero) => {
        if (initialLiquidationState.current[tercero] === 'N') {
          updatedRowsChanged.push({ tercero, liquidar: 'S' })
        }
      })
      Object.entries(initialLiquidationState.current).forEach(([terceroStr, initialState]) => {
        const tercero = parseInt(terceroStr, 10)
        const isCurrentlySelected = newSelectionModel.includes(tercero)

        if (initialState === 'S' && !isCurrentlySelected) {
          updatedRowsChanged.push({ tercero, liquidar: 'N' })
        }
      })
      setRowsChanged(updatedRowsChanged)
    }
    setRowSelectionModel(newSelectionModel)
  }

  useEffect(() => {
    resizeColumns(apiRef, isPendingQuery)
  }, [infoDetail, apiRef, isPendingQuery])

  return (
    <div className='mt-8'>
      <BasicTitle title='Empleados' />
      <div className='p-5 backgroundwhite1 shadow-lg rounded-lg border'>
        <div className='w-full flex flex-row justify-between mb-8'>
          <SearchTable
            searchText={searchDetail?.searchText}
            onChange={searchDetail?.handleSearchText}
            clearSearch={handleClearSearch}
            handleKeyDown={handleKeyDown}
            className='xs:col-span-12 sm:col-span-6 md:col-span-8 lg:col-span-8'
            label='Documento o nombre'
            autoFocus={false}
          />
          <Button
            variant='contained'
            onClick={() => handleConfirmLiquidate()}
            disabled={
              jobStatusData?.isExecuting ||
              isNew ||
              infoDetail?.length === 0 ||
              isLiquidated ||
              arePendingChanges
            }
            size='small'
            className='xs:col-span-12 sm:col-span-6 md:col-span-4 lg:col-span-2'
          >
            Liquidar nómina
          </Button>
        </div>

        <div className='h-[calc(80vh-120px)]'>
          <DataGridPremium
            apiRef={apiRef}
            rowSelectionModel={rowSelectionModel}
            onRowSelectionModelChange={handleRowSelectionChange}
            getRowClassName={(params) => getRowClassName(dark, params)}
            columns={columns}
            getRowId={(row) => row?.tercero}
            rows={infoDetail ?? []}
            loading={isPendingQuery}
            checkboxSelection
            disableRowSelectionOnClick
            localeText={localeTextsEsp}
            pagination
            paginationMode='server'
            keepNonExistentRowsSelected
            paginationModel={pagination?.modelDetail ?? undefined}
            onPaginationModelChange={pagination?.handlePaginationModelChange ?? null}
            rowCount={pagination?.totalCount ?? null}
            pageSizeOptions={[10, 25, 50, 100]}
            initialState={{
              pagination: { paginationModel: { pageSize: 10 } },
              pinnedColumns: {
                right: ['options'],
              },
            }}
            sx={{
              '& .MuiDataGrid-columnHeader[data-field="__check__"] .MuiCheckbox-root': {
                display: 'none',
              },
              backgroundColor: 'backgroundWhite1',
            }}
          />
        </div>

        {volantePagoModal?.show && (
          <CustomModal
            open={volantePagoModal?.show}
            title={'Volante de pago'}
            handleClose={volantePagoModal?.handleShow}
            size='lg'
          >
            <VolantePago
              componentForm={componentForm}
              infoVolante={infoVolante}
            />
          </CustomModal>
        )}
      </div>
    </div>
  )
}

export default DetailTable
