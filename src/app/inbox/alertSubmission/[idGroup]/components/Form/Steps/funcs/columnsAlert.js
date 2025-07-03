import { formatToLocaleDate, formatToLocaleDateString } from '@/lib'
import { Chip } from '@mui/material'

export const columnsAlerts = [
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
]

export const columnsAlertsResume = [
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
    headerName: 'Fecha Inicio',
    width: 100,
    valueGetter: (params) => `${formatToLocaleDate(params?.value)}`,
  },
  {
    field: 'nombre_modelo',
    headerName: 'Modelo',
    width: 200,
    valueGetter: (params) => {
      return `${params?.row?.alertaInfo.modeloInfo?.nombre ?? ''}`
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
    width: 130,
    disableColumnMenu: true,
    headerAlign: 'center',
    align: 'center',
    renderCell: (params) => (
      <Chip
        label={params?.row?.estado}
        color='secondary'
        variant='outlined'
      />
    ),
  },
]

export const columnsAlertSummary = [
  {
    field: 'alertName',
    headerName: 'Identificación',
    width: 200,
  },
  {
    field: 'modelName',
    headerName: 'Modelo',
    width: 200,
  },
  {
    field: 'category',
    headerName: 'Categoría',
    width: 200,
  },
  {
    field: 'initialDate',
    headerName: 'Fecha inicial',
    width: 200,
    valueFormatter: (params) => formatToLocaleDateString(params.value),
  },
]
