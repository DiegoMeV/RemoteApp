import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormTeam } from '../components'

const ViewMembers = ({
  teams,
  isLoading,
  isError,
  idEdition,
  refetchTeamsMember,
  fechingMembers,
  teamInfo,
}) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`Miembros de región ${teamInfo?.data?.[0]?.nombre}`}
            backpath={`/applications/teams`}
          />
          <FormTeam
            teams={teams}
            idEdition={idEdition}
            refetchTeamsMember={refetchTeamsMember}
            fechingMembers={fechingMembers}
          />
        </>
      )}
    </>
  )
}

export default ViewMembers
