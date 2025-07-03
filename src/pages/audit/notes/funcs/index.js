import { formatToLocaleDate } from '@/libV4'

export const columns = [
  {
    field: 'user',
    headerName: 'Usuario',
    width: 300,
    valueGetter: (params) =>
      `${params.row?.byUserData?.firstName ?? ''} ${params.row?.byUserData?.lastName ?? ''}`,
  },
  { field: 'comment', headerName: 'Comentario', flex: 1 },
  {
    field: 'createdAt',
    headerName: 'Fecha',
    minWidth: 300,
    renderCell: (params) => formatToLocaleDate(params.value),
  },
]
