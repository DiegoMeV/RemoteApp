import { Button } from '@mui/material'

const columnsForAllAlerts = (navigate, hasPrivilege) => {
  const editAlert = (id) => {
    navigate(`/applications/alertMonitoring/${id}`)
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
      headerName: '',
      width: 150,
      resizable: false,
      sortable: false,
      disableColumnMenu: true,
      headerAlign: 'center',
      align: 'center',
      renderCell: (params) => (
        <Button
          variant='contained'
          sx={{ borderRadius: '20px' }}
          color='primary'
          disabled={!hasPrivilege}
          onClick={() => {
            if (!hasPrivilege) return
            editAlert(params.row.id)
          }}
        >
          Gestionar
        </Button>
      ),
    },
  ]
  return { columns }
}

export default columnsForAllAlerts
