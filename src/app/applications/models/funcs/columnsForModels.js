import { EditOption, GenericChip } from '../../components'
import { Box } from '@mui/material'
import { containerEditOptionAlertTable } from '../../components/styles'

const columnsForModels = (navigate, hasPrivilege) => {
  const handleEdit = (id) => {
    navigate(`/applications/models/${id}`)
  }

  const columns = [
    { field: 'identificador', headerName: 'Id Modelo', minWidth: 200 },
    { field: 'nombre', headerName: 'Nombre', minWidth: 200 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 300 },
    {
      field: 'activo',
      headerName: 'Estado',
      headerAlign: 'center',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      renderCell: (params) => {
        return (
          <Box sx={containerEditOptionAlertTable}>
            <GenericChip params={params} />
          </Box>
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
      width: 60,
      resizable: false,
      headerAlign: 'center',
      renderCell: (params) => (
        <EditOption
          onClick={() => {
            handleEdit(params.row.id)
          }}
        />
      ),
    })
  }
  return { columns }
}

export default columnsForModels
