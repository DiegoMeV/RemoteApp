import { Chip } from '@mui/material'
import { EditOption } from '../../components'
import { MagicString } from '@/lib'

const columnsDef = (navigate, hasPrivilege) => {
  const handleEdit = (id) => {
    navigate(`/applications/variablesContract/${id}`)
  }
  const columns = [
    { field: 'titulo', headerName: 'Titulo', minWidth: 200 },
    {
      field: 'tipo',
      headerName: 'Tipo',
      minWidth: 200,
      valueGetter: (params) => {
        return `${MagicString.TYPE_INPUT[params?.row?.tipo.toUpperCase()] ?? ''}`
      },
    },
    { field: 'dominio', headerName: 'Dominio', minWidth: 200 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 200 },
    {
      field: 'activo',
      headerName: 'Estado',
      minWidth: 100,
      renderCell: (params) => {
        return (
          <Chip
            variant='outlined'
            label={params?.value ? 'Activo' : 'Inactivo'}
            color={params?.value ? 'primary' : 'secondary'}
          />
        )
      },
    },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => <EditOption onClick={() => handleEdit(params.row.id)} />,
    })
  }
  return columns
}

export default columnsDef
