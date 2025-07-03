import { NoAccessCard, useGetTeams } from '@/lib'
import { ViewEditionTeam } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionTeam = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: teamInfo,
    isLoading,
    isError,
  } = useGetTeams({ qry: `/${idEdition}`, enabled: idEdition !== 'new' })

  return (
    <AccessControl
      privilege={idEdition === 'new' ? 'cgr.uri.crear_equipos' : 'cgr.uri.editar_equipos'}
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionTeam
        teamInfo={teamInfo}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionTeam
