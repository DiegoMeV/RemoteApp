import {
  CustomSwitchEditingDG,
  CustomTextFieldEditingDG,
  GenericChip,
} from '@/app/applications/components'
import OptionsRelationsTable from '@/app/applications/components/OptionsRelationsTable'
import { ClassicIconButton } from '@/lib'
import { AddBox } from '@mui/icons-material'

export const useColumnsCategories = ({
  rowModesModel,
  setRowModesModel,
  setNewRow,
  setRows,
  newRow,
  modalCriteria,
  setParams,
}) => {
  return [
    {
      field: 'nombre',
      headerName: 'Nombre',
      editable: true,
      width: 400,
      valueGetter: (params) => `${params.row?.nombre ?? ''}`,
      renderEditCell: (params) => <CustomTextFieldEditingDG {...params} />,
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      editable: true,
      width: 400,
      valueGetter: (params) => `${params.row?.descripcion ?? ''}`,
      renderEditCell: (params) => <CustomTextFieldEditingDG {...params} />,
    },
    {
      field: 'activo',
      headerName: 'Estado',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <GenericChip params={params} />
      },
      renderEditCell: (params) => <CustomSwitchEditingDG {...params} />,
    },
    {
      field: 'options',
      headerName: '',
      width: 80,
      renderCell: ({ id }) => {
        return (
          <OptionsRelationsTable
            id={id}
            rowModesModel={rowModesModel}
            setRowModesModel={setRowModesModel}
            setRows={setRows}
            setNewRow={setNewRow}
            newRow={newRow}
          />
        )
      },
    },
    {
      field: 'agregar criterio',
      headerName: '',
      width: 60,
      renderCell: (params) => {
        return (
          <ClassicIconButton
            title={'Agregar criterio'}
            color='secondary'
            onClick={() => {
              modalCriteria.handleShow()
              setParams(params)
            }}
          >
            <AddBox />
          </ClassicIconButton>
        )
      },
    },
  ]
}

export const restructureCategories = (categories) => {
  return categories.map((category) => {
    return {
      ...category,
      category: { id: category?.category_id, name: category?.nombre_category },
    }
  })
}
