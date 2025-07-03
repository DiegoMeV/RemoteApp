import {
  BackdropLoading,
  ErrorPage,
  NoDataOverlay,
  ValueListGlobal,
  useBoolean,
  useGetCriteria,
  useGetCriteriaCat,
  useSearch,
} from '@/lib'
import { DataGridPremium, GridRowModes } from '@mui/x-data-grid-premium'
import { Box } from '@mui/material'
import { useEffect, useRef, useState } from 'react'
import { restructureCriteria, useColumnsCriteria, useRequestCriteriaCat } from '../funcs'
import { SearchTableWithRequest } from '@/app/applications/components'

const CriteriaCategory = ({ idCategory }) => {
  const apiRef = useRef(null)
  const searchCriteria = useSearch()
  const searchCriteriaCategory = useSearch()
  const modalCriteria = useBoolean()

  const [newRow, setNewRow] = useState(false)
  const [rows, setRows] = useState()
  const [rowModesModel, setRowModesModel] = useState({})
  const [editedVar, setEditedCrit] = useState()
  const [rowParams, setRowParams] = useState()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })

  const {
    data: criteriaCategories,
    isFetching: loadingCategories,
    isError,
    refetch: refetchCrit,
  } = useGetCriteriaCat({
    qry: `?idCategoria=${idCategory}&palabraClave=${searchCriteriaCategory.searchText}&aumentarInfo=true`,
  })

  const { data: criteria, isLoading: loadingCriterias } = useGetCriteria({
    qry: `?activo=S&palabraClave=${searchCriteria.searchText}`,
    enabled: modalCriteria?.show || searchCriteria?.searchText?.length > 1,
  })

  useEffect(() => {
    const adaptedRows = restructureCriteria(criteriaCategories?.data || [])
    setRows(adaptedRows)
  }, [criteriaCategories])

  const selectAutocompleteCriterion = (props, newValue) => {
    const { id, field, value } = props
    apiRef.current.setEditCellValue({ id, field, value: newValue || value })
    apiRef.current.setEditCellValue({
      id,
      field: 'descripcion',
      value: newValue?.criterioInfo?.descripcion ?? '',
    })
  }
  const selectValueInValueList = (params) => {
    const { id, field } = rowParams
    apiRef.current.setEditCellValue({ id, field, value: params.row })
    apiRef.current.setEditCellValue({
      id,
      field: 'descripcion',
      value: params?.row?.descripcion ?? '',
    })
  }

  const columns = useColumnsCriteria({
    rowModesModel,
    setRowModesModel,
    setNewRow,
    setRows,
    newRow,
    criteriaStates: { criteria, loadingCriterias },
    selectAutocompleteCriterion,
    openModal: modalCriteria.handleShow,
    setRowParams,
    searchCriteria,
  })

  const { createCriteriaCat, editCriteriaCat, loadingUpdate } = useRequestCriteriaCat(
    refetchCrit,
    setRowModesModel,
    setNewRow,
    editedVar,
    newRow
  )

  const addCriteriaCat = async () => {
    const newRow = { id: crypto.randomUUID(), isNew: true }
    setRows((prev) => [newRow, ...prev])
    setNewRow(true)
    setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.Edit } })
  }

  const processRowUpdate = (newRow) => {
    const {
      isNew,
      criterioInfo: { id: criterioId },
      id,
      activo,
    } = newRow
    setEditedCrit(newRow)

    const baseParams = {
      criterio_id: criterioId,
      activo: isNew ? 'S' : activo,
    }

    const updateCriteria = () => {
      if (isNew) {
        return createCriteriaCat({ ...baseParams, categoria_id: idCategory })
      } else {
        return editCriteriaCat({ ...baseParams, id })
      }
    }

    updateCriteria()
  }

  const handlePaginationModelChange = (model) => {
    setModel(model)
  }

  return (
    <>
      {isError ? (
        <ErrorPage />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '20px',
            height: 'calc(100vh - 200px)',
            padding: '20px',
            backgroundColor: 'backgroundGrey1',
          }}
        >
          <BackdropLoading loading={loadingUpdate} />
          <SearchTableWithRequest
            searchOptions={searchCriteriaCategory}
            buttonOptions={{
              add: addCriteriaCat,
              disabled: false,
              label: 'Agregar criterio',
            }}
            privilege={'cgr.alertas.crear_modelos'}
          />
          <DataGridPremium
            apiRef={apiRef}
            rows={rows ?? []}
            rowModesModel={rowModesModel}
            editMode='row'
            columns={columns ?? []}
            loading={loadingCategories}
            initialState={{
              pinnedColumns: { right: ['options'] },
            }}
            processRowUpdate={(newRow) => processRowUpdate(newRow)}
            slots={{ noRowsOverlay: NoDataOverlay }}
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
          <ValueListGlobal
            title='Criterios'
            openOptions={modalCriteria}
            searchOptions={searchCriteria}
            loading={loadingCriterias}
            selectedOption={selectValueInValueList}
            rows={criteria?.data ?? []}
            columns={[
              {
                field: 'nombre',
                headerName: 'Nombre',
                width: 200,
              },
              {
                field: 'descripcion',
                headerName: 'Descripción',
                width: 400,
              },
            ]}
            pagination={{
              rowCountState: criteria?.paginacion?.total ?? 0,
              paginationModel: model,
              handlePaginationModelChange: handlePaginationModelChange,
            }}
          />
        </Box>
      )}
    </>
  )
}

export default CriteriaCategory
