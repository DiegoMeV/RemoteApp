import {
  BackdropLoading,
  CustomAccordion,
  ErrorPage,
  NoDataOverlay,
  useBoolean,
  useGetCatModel,
  useSearch,
} from '@/lib'
import { Box } from '@mui/material'
import { useEffect, useState } from 'react'
import { DataGridPremium, GridRowModes } from '@mui/x-data-grid-premium'
import { restructureCategories, useColumnsCategories } from '../../funcs/categories'
import { useRequestsCatModel } from '../../funcs'
import { ModalCriteria } from './components'
import { SearchTableWithRequest } from '@/app/applications/components'

const CategoryTable = ({ idEdition }) => {
  const searchCategory = useSearch()

  const qry = searchCategory
    ? `/${idEdition}/categorias?palabraClave=${searchCategory.searchText}`
    : `/${idEdition}/categorias`

  const {
    data: categoriesModel,
    isFetching,
    isError,
    refetch: refetchCat,
  } = useGetCatModel({
    qry: qry,
    enabled: idEdition !== 'new' && idEdition !== '' && idEdition !== undefined,
  })

  const [newRow, setNewRow] = useState(false)
  const [rows, setRows] = useState()
  const [rowModesModel, setRowModesModel] = useState({})
  const [editedCat, setEditedCat] = useState()
  const [params, setParams] = useState()
  const modalCriteria = useBoolean()

  useEffect(() => {
    const adaptedRows = restructureCategories(categoriesModel?.data || [])
    setRows(adaptedRows)
  }, [categoriesModel])

  const columns = useColumnsCategories({
    modalCriteria,
    rowModesModel,
    setRowModesModel,
    setNewRow,
    setRows,
    newRow,
    setParams,
  })

  const { createCatModel, editCatModel, loadingUpdate } = useRequestsCatModel(
    refetchCat,
    setRowModesModel,
    setNewRow,
    editedCat,
    newRow
  )

  const addCategory = async () => {
    const newRow = { id: crypto.randomUUID(), isNew: true }
    setRows((prev) => [newRow, ...prev])
    setNewRow(true)
    setRowModesModel({ ...rowModesModel, [newRow.id]: { mode: GridRowModes.Edit } })
  }

  const processRowUpdate = (newRow) => {
    setEditedCat(newRow)
    const isNew = newRow?.isNew || false
    if (isNew) {
      createCatModel({
        modelo_id: idEdition,
        nombre: newRow.nombre,
        activo: 'S',
        descripcion: newRow.descripcion,
      })
      return
    }
    editCatModel({
      id: newRow.id,
      modelo_id: idEdition,
      activo: newRow.activo,
      nombre: newRow.nombre,
      descripcion: newRow.descripcion,
    })
  }

  return (
    <CustomAccordion title='Categorias'>
      {isError ? (
        <ErrorPage />
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', rowGap: '10px', height: 500 }}>
          <BackdropLoading loading={loadingUpdate} />
          <SearchTableWithRequest
            searchOptions={searchCategory}
            buttonOptions={{
              add: addCategory,
              disabled: newRow ?? false,
              label: 'Agregar categoría',
            }}
            privilege={'cgr.alertas.crear_modelos'}
          />
          <DataGridPremium
            rows={rows ?? []}
            rowModesModel={rowModesModel}
            editMode='row'
            columns={columns ?? []}
            loading={isFetching}
            processRowUpdate={(newRow) => processRowUpdate(newRow)}
            initialState={{
              pagination: { paginationModel: { pageSize: 50 } },
              pinnedColumns: {
                right: ['activo', 'options', 'agregar criterio'],
              },
            }}
            slots={{ noRowsOverlay: NoDataOverlay }}
            sx={{ backgroundColor: 'backgroundWhite1' }}
          />
        </Box>
      )}
      <ModalCriteria
        modalCriteria={modalCriteria}
        idCategory={params?.row?.id}
      />
    </CustomAccordion>
  )
}

export default CategoryTable
