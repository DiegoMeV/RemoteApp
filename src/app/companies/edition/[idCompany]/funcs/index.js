import { Edit } from '@mui/icons-material'
import { IconButton } from '@mui/material'

export const companyParamsColumns = (setSelectedParam) => [
  {
    headerName: 'Clave',
    field: 'paramKey',
    width: 200,
  },
  {
    headerName: 'Nombre',
    field: 'paramName',
    width: 200,
  },
  {
    headerName: 'Valor',
    field: 'paramValue',
    width: 200,
  },
  {
    headerName: '',
    field: 'options',
    renderCell: ({ row }) => (
      <IconButton
        title='Editar'
        onClick={() => setSelectedParam({ ...row, isNew: false })}
      >
        <Edit />
      </IconButton>
    ),
  },
]
