import { forwardRef, useEffect, useMemo, useState } from 'react'
import { useStoreState } from 'easy-peasy'

import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium } from '@mui/x-data-grid-premium'

import { resizeColumns } from '@/libV4'
import { sortRowsByFechaVencimiento } from '../constants'
import { getRowClassName, NoDataOverlay } from '@/lib'

const MultiSelectTable = forwardRef(
  (
    {
      apiRef,
      rows = [],
      columns,
      loading = false,
      selectedRows = [],
      setSelectedRows = () => {},
      rowCount,
      paginationModel,
      handlePaginationModelChange,
      height = 'calc(100vh - 180px)',
      pinnedColumns = [],
      padding = '20px',
      ...rest
    },
    ref
  ) => {
    const dark = useStoreState((state) => state.darkTheme.dark)
    const [rowSelectionModel, setRowSelectionModel] = useState([])
    const [nonDeselectableRows, setNonDeselectableRows] = useState([])

    const sortedRows = useMemo(() => sortRowsByFechaVencimiento(rows), [rows])

    const selectedRowIds = useMemo(() => selectedRows.map((row) => row.cuota), [selectedRows])

    useEffect(() => {
      if (sortedRows) {
        const adeudaRow = sortedRows?.find((row) => row?.vencido === false)
        const vencidaRows = sortedRows?.filter((row) => row?.vencido === true)
        const vencidaRowIds = vencidaRows?.map((row) => row?.cuota)

        const initialSelection = selectedRowIds?.length
          ? selectedRowIds
          : adeudaRow
          ? [adeudaRow?.cuota, ...vencidaRowIds]
          : vencidaRowIds

        if (
          JSON.stringify(rowSelectionModel) !== JSON.stringify(initialSelection) ||
          JSON.stringify(nonDeselectableRows) !==
            JSON.stringify([...(adeudaRow ? [adeudaRow.cuota] : []), ...vencidaRowIds])
        ) {
          setRowSelectionModel(initialSelection)
          setNonDeselectableRows([...(adeudaRow ? [adeudaRow.cuota] : []), ...vencidaRowIds])
        }
      }
    }, [sortedRows, selectedRowIds, rowSelectionModel, nonDeselectableRows])

    const handleRowSelectionModelChange = (newRowSelectionModel) => {
      const lastSelectedIndex = sortedRows.findIndex(
        (row) =>
          newRowSelectionModel.includes(row?.cuota) && !rowSelectionModel.includes(row?.cuota)
      )
      const lastDeselectedIndex = sortedRows.findIndex(
        (row) =>
          !newRowSelectionModel.includes(row?.cuota) && rowSelectionModel.includes(row?.cuota)
      )

      const selectionStrategies = {
        lastSelected: () =>
          sortedRows
            .filter(
              (row, index) => index <= lastSelectedIndex || nonDeselectableRows.includes(row?.cuota)
            )
            .map((row) => row.cuota),
        lastDeselected: () =>
          sortedRows
            .filter(
              (row, index) =>
                index < lastDeselectedIndex || nonDeselectableRows.includes(row?.cuota)
            )
            .map((row) => row.cuota),
        default: () =>
          newRowSelectionModel.concat(
            nonDeselectableRows.filter((cuota) => !newRowSelectionModel.includes(cuota))
          ),
      }

      const strategyKey =
        lastSelectedIndex !== -1
          ? 'lastSelected'
          : lastDeselectedIndex !== -1
          ? 'lastDeselected'
          : 'default'

      const newSelection = selectionStrategies[strategyKey]()

      if (JSON.stringify(rowSelectionModel) !== JSON.stringify(newSelection)) {
        setRowSelectionModel(newSelection)
        setSelectedRows(newSelection.map((cuota) => sortedRows.find((row) => row?.cuota === cuota)))
      }
    }

    useEffect(() => {
      resizeColumns(apiRef, loading)
    }, [rows, apiRef, loading])

    return (
      <Box
        sx={{ width: '100%' }}
        height={height}
        bgcolor='backgroundWhite1'
        p={padding}
      >
        <DataGridPremium
          ref={ref}
          apiRef={apiRef}
          rows={rows ?? []}
          columns={columns ?? []}
          pagination
          rowCount={rowCount ?? null}
          paginationMode={paginationModel ? 'server' : 'client'}
          paginationModel={paginationModel ?? undefined}
          onPaginationModelChange={handlePaginationModelChange ?? null}
          getRowClassName={(params) => getRowClassName(dark, params)}
          getRowId={(row) => row?.cuota}
          checkboxSelection
          disableRowSelectionOnClick
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={rowSelectionModel}
          pageSizeOptions={[10, 25, 50, 100]}
          initialState={{
            pagination: { paginationModel: { pageSize: 25 } },
            pinnedColumns: {
              right: [...pinnedColumns, 'options'],
            },
            ...(rows.length > 0 && {
              aggregation: {
                model: {
                  valor: 'sum',
                },
              },
            }),
          }}
          slots={{
            loadingOverlay: LinearProgress,
            noRowsOverlay: NoDataOverlay,
          }}
          {...rest}
          sx={{
            backgroundColor: 'backgroundWhite1',
            minHeight: '300px',
            '.MuiDataGrid-aggregationColumnHeaderLabel': {
              display: 'none',
            },
            ...rest?.sx,
          }}
        />
      </Box>
    )
  }
)

MultiSelectTable.displayName = 'MultiSelectTable'

export default MultiSelectTable
