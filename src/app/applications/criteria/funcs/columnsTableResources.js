import { EditOption, GenericChip } from '../../components'

const columnsTableResources = (navigate, hasPrivilege) => {
  const editcriteria = (id) => {
    navigate(`/applications/criteria/${id}`)
  }
  const columns = [
    { field: 'nombre', headerName: 'Nombre', minWidth: 300 },
    { field: 'descripcion', headerName: 'Descripción', minWidth: 300 },
    {
      field: 'activo',
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
        return <EditOption onClick={() => editcriteria(params.row.id)} />
      },
      resizable: false,
    })
  }
  return columns
}

export default columnsTableResources
