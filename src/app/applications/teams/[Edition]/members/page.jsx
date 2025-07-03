import { useGetTeams, useGetTeamsMembers } from '@/lib'
import { ViewMembers } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const Members = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: teams,
    isError,
    refetch: refetchTeamsMember,
    isFetching: fechingMembers,
  } = useGetTeamsMembers({ qry: `?idEquipoUri=${idEdition}`, enabled: idEdition !== 'new' })
  const { data: teamInfo, isFetching } = useGetTeams({
    qry: `/${idEdition}`,
    enabled: idEdition !== 'new',
  })
  return (
    <AccessControl privilege='cgr.uri.visualizar_miembros_equipo'>
      <ViewMembers
        teams={teams}
        isLoading={isFetching}
        isError={isError}
        idEdition={idEdition}
        refetchTeamsMember={refetchTeamsMember}
        fechingMembers={fechingMembers}
        teamInfo={teamInfo}
      />
    </AccessControl>
  )
}

export default Members
