import { Box, LinearProgress } from '@mui/material'
import {
  DataGridPremium,
  useGridApiRef,
  useKeepGroupedColumnsHidden,
} from '@mui/x-data-grid-premium'
import React from 'react'
import { sxSearchTables } from '../../styles'
import { containerDinamicAlertTable } from '../../components/styles'
import { columnsTable } from '../funcs'
import { useStoreActions } from 'easy-peasy'
import { useSentConfirmationEmail } from '../hooks'
import FilterTableAndAction from './FilterTableAndAction'
import { NoDataOverlay, usePrivileges } from '@/lib'

const TableComponent = ({
  rethusProcesses,
  paginationModel,
  handlePaginationModelChange,
  rowSelectionModel,
  rowCountState,
  isLoadingRethusProcess,
  handleRowSelectionModelChange,
  viewBatch,
  filterValue,
  rethusDataProcess,
  paramsData,
  ...rest
}) => {
  const setConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.setConfirmAlertProps
  )
  const canSentEmail = usePrivileges('rethus.opciones.enviar_notificacion')

  const { sendConfirmationEmail, loadingEmail } = useSentConfirmationEmail({
    rethusDataProcess,
    paramsData,
    filterValue,
  })
  const columns = columnsTable({
    viewBatch,
    filterValue,
    setConfirmAlertProps,
    sendConfirmationEmail,
    canSentEmail,
  })
  const apiRef = useGridApiRef()
  const initialState = useKeepGroupedColumnsHidden({
    apiRef,
    initialState: {
      rowGrouping: {
        model: ['identifierRethusRegistry'],
      },
      pagination: {
        paginationModel: {
          pageSize: 50,
        },
      },
      pinnedColumns: {
        right: ['view'],
      },
    },
  })
  const loading = isLoadingRethusProcess || loadingEmail
  return (
    <Box sx={sxSearchTables}>
      <FilterTableAndAction
        filterValue={filterValue}
        loading={loading}
        {...rest}
      />
      <Box
        component='div'
        sx={containerDinamicAlertTable}
      >
        <DataGridPremium
          checkboxSelection={filterValue === 0}
          apiRef={apiRef}
          columns={columns}
          rows={rethusProcesses ?? []}
          paginationMode='server'
          paginationModel={paginationModel}
          onPaginationModelChange={handlePaginationModelChange}
          onRowSelectionModelChange={handleRowSelectionModelChange}
          rowSelectionModel={rowSelectionModel}
          rowCount={rowCountState}
          loading={loading}
          slots={{
            noRowsOverlay: NoDataOverlay,
            loadingOverlay: LinearProgress,
          }}
          initialState={initialState}
          pagination
          pageSizeOptions={[10, 25, 50, 100]}
          sx={{
            backgroundColor: 'backgroundWhite1',
            minHeight: '64vh',
            maxHeight: '64vh',
          }}
        />
      </Box>
    </Box>
  )
}

export default TableComponent
