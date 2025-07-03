import { Box, Chip } from '@mui/material'
import { containerEditOptionAlertTable } from '../../components/styles'
import { EditOption } from '../../components'

const columnsForAllAlerts = (navigate, hasPrivilege) => {
  const editAlert = (id) => {
    navigate(`/applications/alerts/${id}`)
  }
  const columns = [
    {
      field: 'identificador',
      headerName: 'Identificador',
      minWidth: 200,
      valueGetter: (params) => {
        return `${params?.row?.identificador ?? ''}`
      },
    },
    {
      field: 'fecha_registro',
      headerName: 'Fecha Inicio',
      minWidth: 150,
      valueFormatter: (params) => new Date(params.value).toLocaleDateString(),
    },
    {
      field: 'modeloInfo',
      headerName: 'Modelo',
      minWidth: 150,

      valueFormatter: (params) => params.value?.nombre || '',
    },
    {
      field: 'descripcion',
      headerName: 'Descripción',
      minWidth: 150,

      valueGetter: (params) => {
        return `${params?.row?.descripcion ?? ''}`
      },
    },
    {
      field: 'activo',
      headerName: 'Estado',
      width: 150,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Chip
          label={params.row.estado}
          color='secondary'
        />
      ),
    },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => (
        <Box sx={containerEditOptionAlertTable}>
          <EditOption
            onClick={() => {
              editAlert(params.row.id)
            }}
          />
        </Box>
      ),
      hideable: false,
    })
  }
  return { columns }
}

export default columnsForAllAlerts
