import { JobtitlesOptions } from '../components'
import { formatToLocaleDate, GenericChip } from '@/libV4'

export const jobtitlesColumns = (handleOpenEdition, handleEditRoles) => [
  {
    field: 'name',
    headerName: 'Nombre',
  },
  {
    field: 'createdAt',
    headerName: 'Fecha de creación',
    renderCell: (data) => {
      return formatToLocaleDate(data.createdAt)
    },
  },
  {
    field: 'isActive',
    headerName: 'Estado',
    width: 100,
    renderCell: (data) => {
      return GenericChip({
        color: data.isActive ? 'primary' : 'secondary',
        label: data.isActive ? 'Activo' : 'Inactivo',
      })
    },
  },
  {
    field: 'options',
    headerName: '',
    width: 100,
    pinned: 'right',
    renderCell: (data) => {
      return JobtitlesOptions({ data, handleOpenEdition, handleEditRoles })
    },
  },
]
