import { formatToLocaleDate } from '@/lib'

export const columnsCategories = [{ field: 'nombre', headerName: 'Nombre', width: 400 }]

export const columnsModels = [
  ...columnsCategories,
  { field: 'identificador', headerName: 'identificador', width: 300 },
]
export const columnsCriteria = [
  {
    field: 'nombre',
    headerName: 'nombre del criterio',
    width: 400,
    valueGetter: (params) => `${params.row.criterioInfo.nombre}`,
  },
]

export const columnsComments = [
  {
    field: 'fecha_registro',
    headerName: 'Fecha comite',
    valueGetter: (params) => `${formatToLocaleDate(params.value)}`,
  },
  {
    field: 'estado',
    headerName: 'Estado',
  },
  {
    field: 'comentario',
    headerName: 'Comentario',
    flex: 1,
  },
]
