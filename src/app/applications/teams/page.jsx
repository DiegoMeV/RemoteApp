import { useNavigate } from 'react-router-dom'
import { NoAccessCard, useGetTeams, usePrivileges, useSearch } from '@/lib'
import { ViewTeams } from './views'
import { columnsTeams } from './funcs'
import { AccessControl } from '@/libV4'

const Teams = () => {
  const navigate = useNavigate()
  const searchTeams = useSearch()
  const {
    data: teams,
    isLoading,
    isError,
  } = useGetTeams({ qry: `?palabraClave=${searchTeams?.searchText}` })
  const addTeam = () => {
    navigate('/applications/teams/new')
  }
  const editAccess = usePrivileges('cgr.uri.editar_equipos')
  const viewAccess = usePrivileges('cgr.uri.visualizar_miembros_equipo')
  const columns = columnsTeams(navigate, editAccess, viewAccess)
  const params = {
    teams,
    isLoading,
    isError,
    columns,
    addTeam,
    searchTeams,
  }
  return (
    <AccessControl
      privilege='cgr.uri.visualizar_equipos'
      nodeContent={<NoAccessCard />}
    >
      <ViewTeams {...params} />
    </AccessControl>
  )
}

export default Teams
