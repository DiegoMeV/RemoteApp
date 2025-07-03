import { EditOption } from '@/app/applications/components'
import { containerEditOptionAlertTable } from '@/app/applications/components/styles'
import { formatToLocaleDateString } from '@/lib'
import { Box, Chip } from '@mui/material'

const columnsTableRegistryAlerts = (setAlertService) => {
  const editAlert = (id) => {
    setAlertService({ view: 'edit', additionalData: id })
  }
  const columns = [
    { field: 'identificador', headerName: 'Identificador', width: 150 },
    {
      field: 'fecha_registro',
      headerName: 'Fecha inicio',
      width: 150,
      valueFormatter: (params) => formatToLocaleDateString(params.value),
    },
    {
      field: 'modeloInfo',
      headerName: 'Modelo',
      width: 150,
      valueFormatter: (params) => params.value.nombre || '',
    },
    { field: 'descripcion', headerName: 'Descripción', width: 150 },
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
    {
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      resizable: false,
      headerAlign: 'center',
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
    },
  ]
  return { columns }
}

export default columnsTableRegistryAlerts
