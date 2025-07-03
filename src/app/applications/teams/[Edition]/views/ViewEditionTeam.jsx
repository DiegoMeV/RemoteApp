import { TitleAlerts } from '@/app/applications/components'
import { ErrorPage, Loading } from '@/lib'
import { FormTeam } from '../components'

const ViewEditionTeam = ({ teamInfo, isLoading, isError, idEdition }) => {
  return (
    <>
      {isLoading ? (
        <Loading />
      ) : isError ? (
        <ErrorPage />
      ) : (
        <>
          <TitleAlerts
            title={`${idEdition === 'new' ? 'Creación' : 'Edición'} de región`}
            backpath={`/applications/teams`}
          />
          <FormTeam
            teamInfo={teamInfo}
            idEdition={idEdition}
          />
        </>
      )}
    </>
  )
}

export default ViewEditionTeam
