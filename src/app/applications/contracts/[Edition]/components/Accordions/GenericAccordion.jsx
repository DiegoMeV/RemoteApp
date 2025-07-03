import {
  CustomAccordion,
  CustomSearchDatagrid,
  ErrorPage,
  NoDataOverlay,
  resizeColumns,
} from '@/lib'
import { Box, LinearProgress } from '@mui/material'
import { DataGridPremium, GridRowModes, useGridApiRef } from '@mui/x-data-grid-premium'
import { useEffect, useRef, useState } from 'react'
import { columnOption } from '../../funcs'

const GenericAccordion = ({
  apiRefDatagrid,
  editable,
  title,
  labelButton,
  columns = [],
  infoRows,
  updateInfo,
  loadingInfo,
  isError,
  rowModesModel,
  setRowModesModel,
  newRow,
  setNewRow,
  delItem,
  labelButton2,
  onClick2,
  expandAccordion,
  handleOpenAccordion,
  noAccordion,
  shouldDelete = true,
  disabledButtons = false,
  noSearch,
  setIdProcessRow,
}) => {
  const apiRef = useGridApiRef()
  const [rows, setRows] = useState(infoRows ?? [])
  const initialRef = useRef()

  useEffect(() => {
    if (infoRows) {
      setRows(infoRows)
      initialRef.current = infoRows
    }
  }, [infoRows, expandAccordion])

  useEffect(() => {
    resizeColumns(apiRefDatagrid ?? apiRef, loadingInfo)
  }, [apiRef, apiRefDatagrid, loadingInfo])

  const addRow = async () => {
    const idNewRegion = crypto.randomUUID()
    await setRows([{ id: idNewRegion, isNew: true }, ...rows])
    setNewRow(true)
    setIdProcessRow?.(idNewRegion)
    setRowModesModel((prev) => ({ ...prev, [idNewRegion]: { mode: GridRowModes.Edit } }))
  }

  const finalRef = apiRefDatagrid ?? apiRef

  const options = columnOption(
    rowModesModel,
    setRowModesModel,
    newRow,
    setNewRow,
    setRows,
    delItem,
    editable,
    shouldDelete,
    finalRef,
    initialRef
  )

  const processRowUpdate = (newRow) => {
    resizeColumns(apiRefDatagrid ?? apiRef, loadingInfo)
    updateInfo?.(newRow)
    return newRow
  }

  const renderContent = () =>
    isError ? (
      <ErrorPage />
    ) : (
      <Box sx={{ height: '400px' }}>
        <DataGridPremium
          apiRef={apiRefDatagrid ?? apiRef}
          columns={[...columns, options]}
          rowModesModel={rowModesModel}
          onProcessRowUpdateError={(params) => {
            console.error(params)
          }}
          getRowHeight={() => 'auto'}
          rows={rows ?? []}
          editMode='row'
          processRowUpdate={processRowUpdate}
          initialState={{
            pagination: { paginationModel: { pageSize: 50 } },
            pinnedColumns: {
              right: ['options'],
            },
            aggregation: {
              model: {
                valor: 'sum',
              },
            },
          }}
          loading={loadingInfo}
          pageSizeOptions={[10, 25, 50, 100]}
          slots={{
            toolbar: CustomSearchDatagrid,
            loadingOverlay: LinearProgress,
            noRowsOverlay: NoDataOverlay,
          }}
          slotProps={{
            toolbar: {
              buttonLabel: labelButton,
              onClick: addRow,
              disabledButton: newRow || disabledButtons,
              buttonLabel2: labelButton2,
              onClick2: onClick2,
              loadingInfo,
              noSearch,
            },
          }}
          sx={{ backgroundColor: 'backgroundWhite1' }}
        />
      </Box>
    )

  return (
    <>
      {noAccordion ? (
        renderContent()
      ) : (
        <CustomAccordion
          title={title}
          expandedValue={expandAccordion}
          onClickAccordion={handleOpenAccordion}
        >
          {renderContent()}
        </CustomAccordion>
      )}
    </>
  )
}

export default GenericAccordion
