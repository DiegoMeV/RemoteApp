import { EditOption } from '@/app/applications/components'

export const columnsDef = (navigate, hasPrivilege) => {
  const handleEdit = (id) => {
    navigate(`/applications/ubication/satellite/${id}`)
  }
  const columns = [{ field: 'nombre', headerName: 'Nombre', minWidth: 300 }]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      width: 60,
      sortable: false,
      disableColumnMenu: true,
      hideable: false,
      resizable: false,
      headerAlign: 'center',
      renderHeader: () => '',
      renderCell: (params) => <EditOption onClick={() => handleEdit(params.row.id)} />,
    })
  }
  return columns
}
