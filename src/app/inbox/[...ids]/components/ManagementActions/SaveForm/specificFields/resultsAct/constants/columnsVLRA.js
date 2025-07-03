import { formatToLocaleDate } from '@/lib'
import { Chip } from '@mui/material'

export const columnsAlertsTSA = [
  {
    field: 'name',
    headerName: 'Identificador',
    width: 150,
    valueGetter: (params) => {
      return `${params?.row?.name ?? params?.row?.procesoInfo?.identifier ?? ''}`
    },
  },
  {
    field: 'fecha_registro',
    headerName: 'Fecha inicio',
    width: 100,
    valueGetter: (params) => `${formatToLocaleDate(params?.value)}`,
  },
  {
    field: 'nombre_modelo',
    headerName: 'Modelo',
    width: 200,
    valueGetter: (params) => {
      return `${params?.row?.nombre_modelo ?? ''}`
    },
  },
  {
    field: 'descripcion',
    headerName: 'Descripción',
    width: 200,
    valueGetter: (params) => {
      return `${params?.row?.alertaInfo?.descripcion ?? ''}`
    },
  },
  {
    field: 'habilitar_boton',
    headerName: 'Estado',
    width: 120,
    resizable: false,
    sortable: false,
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => {
      const isButton = params?.value === 'S'
      return (
        <Chip
          variant='outlined'
          label={isButton ? 'Disponible' : 'No disponible'}
          color={isButton ? 'primary' : 'secondary'}
          sx={{ width: '100%' }}
        />
      )
    },
  },
]
