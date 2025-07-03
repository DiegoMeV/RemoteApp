import { formatToLocaleDate } from '@/libV4'

const columnsUsersTransfer = () => {
  const columns = [
    {
      field: 'identificador',
      headerName: 'Identificador',
      minWidth: 200,
      renderCell: (params) => {
        return `${params?.Process?.identifier ?? ''}`
      },
    },
    {
      field: 'process_group',
      headerName: 'Grupo de Proceso',
      minWidth: 150,
      renderCell: (params) => {
        return `${params?.Process?.ProcessType?.Group?.name ?? ''}`
      },
    },
    {
      field: 'type_process',
      headerName: 'Tipo de Proceso',
      minWidth: 150,
      renderCell: (params) => {
        return `${params?.Process?.ProcessType?.name ?? ''}`
      },
    },
    {
      field: 'activity',
      headerName: 'Actividad',
      minWidth: 150,
      renderCell: (params) => params?.Task?.name || '',
    },
    {
      field: 'date',
      headerName: 'Fecha de notificación',
      minWidth: 150,
      renderCell: (params) => formatToLocaleDate(params.notifiedAt),
    },
  ]
  return { columns }
}

export default columnsUsersTransfer
