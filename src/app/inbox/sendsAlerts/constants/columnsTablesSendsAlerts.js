import { formatToLocaleDate } from '@/lib'

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
    field: 'identificador_diari',
    headerName: 'Identificador DIARI',
    width: 150,
    valueGetter: (params) => {
      return `${params?.row?.alertaInfo?.identificador_diari ?? ''}`
    },
  },
  // TODO:
  // {
  //   field: 'fecha_aprobacion',
  //   headerName: 'Fecha Aprobación',
  //   width: 100,
  //   valueGetter: (params) => (
  //     `${formatToLocaleDate(params?.row?.value)}`
  //   ),
  // },
  {
    field: 'nombre_modelo',
    headerName: 'Modelo',
    width: 200,
    valueGetter: (params) => {
      return `${params?.row?.alertaInfo?.modeloInfo?.nombre ?? ''}`
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
    field: 'fecha_aprobacion',
    headerName: 'Fecha aprobación',
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
