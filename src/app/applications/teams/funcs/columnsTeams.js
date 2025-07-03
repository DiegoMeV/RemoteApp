import { EditOptionTeam } from '../components'
import { GenericChip } from '../../components'

const columnsTeams = (navigate, editAccess, viewAccess) => {
  const editTeam = (id) => {
    navigate(`/applications/teams/${id}`)
  }
  const viewMembers = (id) => {
    navigate(`/applications/teams/${id}/members`)
  }
  const columns = [
    {
      field: 'nombre',
      headerName: 'Nombre',
      width: 250,
      editable: true,
      valueGetter: (params) => {
        return `${params?.row?.nombre ?? ''}`
      },
    },
    {
      field: 'activo',
      headerName: 'Estado',
      width: 100,
      editable: true,
      renderCell: (params) => {
        return <GenericChip params={params} />
      },
    },
    {
      field: 'options',
      headerName: '',
      sortable: false,
      disableColumnMenu: true,
      width: 100,
      renderCell: (params) => {
        return (
          <EditOptionTeam
            params={params}
            editTeam={editTeam}
            viewMembers={viewMembers}
            editAccess={editAccess}
            viewAccess={viewAccess}
          />
        )
      },
      resizable: false,
    },
  ]
  return columns
}

export default columnsTeams
