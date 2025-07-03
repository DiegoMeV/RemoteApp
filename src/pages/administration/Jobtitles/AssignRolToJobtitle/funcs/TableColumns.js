import { TableOptions } from '../components'

export const columnsRolesByJobtitle = (deleteRol, showPrivileges) => [
  {
    field: 'name',
    headerName: 'Nombre del rol',
  },
  {
    field: 'description',
    headerName: 'Descripción',
  },
  {
    field: 'options',
    headerName: '',
    pinned: 'right',
    width: 100,
    renderCell: (data) => {
      return TableOptions({ data, deleteRol, showPrivileges })
    },
  },
]
