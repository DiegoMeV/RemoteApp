import { EditOption, GenericChip } from '../../components'

const columnsActingTypes = (navigate, hasPrivilege) => {
  const editActingType = (id) => {
    navigate(`/applications/actingTypes/${id}`)
  }
  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 300 },
    {
      field: 'isActive',
      headerName: 'Estado',
      width: 100,
      renderCell: (params) => {
        return <GenericChip params={params} />
      },
    },
  ]
  if (hasPrivilege) {
    columns.push({
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => {
        return <EditOption onClick={() => editActingType(params.row.id)} />
      },
      resizable: false,
    })
  }
  return columns
}

export default columnsActingTypes
