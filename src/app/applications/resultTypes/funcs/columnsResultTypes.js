import { EditOption } from '../../components'
import { Chip } from '@mui/material'

const columnsResultTypes = (navigate, hasPrivilege) => {
  const editActingType = (id) => {
    navigate(`/applications/resultTypes/${id}`)
  }
  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 300 },
    {
      field: 'activo',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => {
        return (
          <Chip
            variant='outlined'
            label={params.value ? 'Activo' : 'Inactivo'}
            color={params.value ? 'primary' : 'secondary'}
          />
        )
      },
    },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => {
        return <EditOption onClick={() => editActingType(params.row.id)} />
      },
      resizable: false,
    })
  }
  return columns
}

export default columnsResultTypes
