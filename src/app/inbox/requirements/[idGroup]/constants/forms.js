import { MappingOptions, toArray } from '@/lib'
import { Delete } from '@mui/icons-material'

export const columns = [
  {
    field: 'nombre',
    headerName: 'Nombre',
    minWidth: 200,
    valueGetter: (params) => {
      return `${params?.row?.nombre ?? ''}`
    },
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    minWidth: 200,
    valueGetter: (params) => {
      return `${params?.row?.descripcion ?? ''}`
    },
  },
]

export const columnsProcessRelated = [
  { field: 'identifier', headerName: 'Identificador', width: 150 },
  {
    field: 'processTypeName',
    headerName: 'Nombre de proceso',
    width: 300,
    valueGetter: (params) => {
      return `${params.row?.ProcessType?.name ?? ''}`
    },
  },
  {
    field: 'sigedocNumber',
    headerName: 'Numero de SIGEDOC',
    width: 200,
  },
  {
    field: 'sigedocDate',
    headerName: 'Fecha de radicación de SIGEDOC',
    width: 250,
  },
]

export const columnsTypeRequest = (rowDesTypeSol, setRowDesTypeSol) => {
  const deleteOption = {
    field: 'options',
    headerName: '',
    maxWidth: 60,
    renderCell: ({ id }) => {
      return (
        <MappingOptions
          options={[
            {
              title: 'Eliminar item',
              icon: <Delete />,
              hoverColor: '#D32F2F',
              onClick: () => {
                const deleteItem = rowDesTypeSol.filter((item) => {
                  return item.id !== id
                })
                setRowDesTypeSol(toArray(deleteItem))
              },
            },
          ]}
        />
      )
    },
  }
  return [...columns, deleteOption]
}
