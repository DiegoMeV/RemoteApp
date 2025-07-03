import { DeleteOutlined } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export * from './interventoresQuerys'
export const interventoresColumns = ({ handleDelete }) => [
  { field: 'tercero', headerName: 'Número de interventor', minWidth: 200 },
  {
    field: 'nombre_tercero',
    headerName: 'Nombre de interventor',
    minWidth: 200,
  },
  {
    field: 'tercero_type',
    headerName: 'Tipo',
    minWidth: 200,
  },
  {
    field: 'interno',
    headerName: 'Cargo interno',
    minWidth: 200,
  },
  {
    field: 'cargoExterno',
    headerName: 'Cargo externo',
    type: 'number',
    minWidth: 0,
  },
  {
    field: 'tipoCargo',
    headerName: 'Tipo de cargo',
    type: 'number',
    minWidth: 0,
  },
  {
    field: 'options',
    headerName: '',
    minWidth: 90,
    pinned: 'right',
    renderCell: (params) => {
      return (
        <IconButton onClick={() => handleDelete(params)}>
          <DeleteOutlined />
        </IconButton>
      )
    },
  },
]
