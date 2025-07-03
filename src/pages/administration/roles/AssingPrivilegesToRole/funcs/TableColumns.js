import { TableOptions } from '../components'

export const columnsPrivilegesByRole = (deletePriv, deletePrivilege) => {
  const optionsColumn = {
    field: 'options',
    headerName: '',
    pinned: 'right',
    renderCell: (data) => {
      return TableOptions({ data, deletePriv })
    },
  }

  const columns = [
    {
      headerName: 'Nombre',
      field: 'name',
    },
    {
      headerName: 'Descripción',
      field: 'description',
    },
    {
      headerName: 'Código',
      field: 'sidName',
    },
  ]

  return deletePrivilege ? [...columns, optionsColumn] : columns
}
