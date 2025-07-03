import {
  BackdropLoading,
  CustomAccordion,
  CustomSearchDatagrid,
  ErrorPage,
  ValueListGlobal,
  useBoolean,
  useGetVariables,
  useListVarBlock,
  useSearch,
} from '@/lib'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { DataGridPremium, GridRowModes } from '@mui/x-data-grid-premium'
import { restructureVariables, useColumnsVariables, useRequestsVarBlock } from '../funcs'
import { buildQryVariables } from '@/app/applications/funcs'

const VariablesBlock = ({ idEdition }) => {
  const apiRef = useRef()
  const {
    data: variablesBlock,
    isFetching,
    isError,
    refetch: refetchVar,
  } = useListVarBlock({ idBlock: idEdition })
  const [newRow, setNewRow] = useState(false)
  const [rows, setRows] = useState()
  const [rowParams, setRowParams] = useState()
  const [rowModesModel, setRowModesModel] = useState({})
  const [editedVar, setEditedVar] = useState()

  const modalVariables = useBoolean()
  const searchVariable = useSearch()

  const qry = buildQryVariables(searchVariable.searchText, 'BLOQUE')

  const { data: variables, isFetching: loadingVariables } = useGetVariables({
    qry: qry,
    enabled: modalVariables?.show || searchVariable?.searchText?.length > 1,
  })

  useEffect(() => {
    const adaptedRows = restructureVariables(variablesBlock?.data || [])
    setRows(adaptedRows)
  }, [variablesBlock])

  const selectAutocompleteValue = (params, newValue) => {
    const { id, field, value } = params
    apiRef.current.setEditCellValue({ id, field, value: newValue || value })
  }

  const variableOptions = {
    modalVariables,
    variables,
    loadingVariables,
    searchVariable,
    setRowParams,
    selectAutocompleteValue,
  }

  const columns = useColumnsVariables(
    rowModesModel,
    setRowModesModel,
    setNewRow,
    setRows,
    newRow,
    variableOptions
  )
  const { createVarBlock, editVarBlock, loadingUpdate } = useRequestsVarBlock(
    refetchVar,
    setRowModesModel,
    setNewRow,
    editedVar
  )

  const addVariable = async () => {
    const newRow = { id: crypto.randomUUID(), isNew: true }
    setRows((prev) => [newRow, ...prev])
    setNewRow(true)
    setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.Edit } })
  }

  const processRowUpdate = (newRow) => {
    setEditedVar(newRow)
    const isNew = newRow?.isNew || false
    if (isNew) {
      createVarBlock({
        bloque_id: idEdition,
        variable_id: newRow.variable.id,
        orden: newRow.orden,
        descripcion: newRow.descripcion,
      })
      return
    }
    editVarBlock({
      id: newRow.id,
      bloque_id: idEdition,
      variable_id: newRow.variable.id,
      orden: newRow.orden,
      descripcion: newRow.descripcion,
    })
  }

  return (
    <CustomAccordion title='Variables'>
      {isError ? (
        <ErrorPage />
      ) : (
        <Box sx={{ height: 500 }}>
          <BackdropLoading loading={loadingUpdate} />
          <DataGridPremium
            apiRef={apiRef}
            rows={rows ?? []}
            rowModesModel={rowModesModel}
            editMode='row'
            columns={columns ?? []}
            loading={isFetching}
            processRowUpdate={(newRow) => processRowUpdate(newRow)}
            initialState={{
              pagination: { paginationModel: { pageSize: 50 } },
              pinnedColumns: {
                right: ['options'],
              },
            }}
            slots={{ toolbar: CustomSearchDatagrid }}
            slotProps={{
              toolbar: {
                buttonLabel: 'Agregar Variable',
                onClick: addVariable,
                disabledButton: newRow ?? false,
              },
            }}
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
          <ValueListGlobal
            title='Variables'
            openOptions={modalVariables}
            searchOptions={searchVariable}
            rows={variables?.data}
            loading={loadingVariables}
            columns={[
              {
                field: 'nombre',
                headerName: 'Nombre',
                width: 200,
              },

              { field: 'descripcion', headerName: 'Descripción', width: 300 },
            ]}
            selectedOption={(params) => selectAutocompleteValue(rowParams, params.row)}
          />
        </Box>
      )}
    </CustomAccordion>
  )
}

export default VariablesBlock
