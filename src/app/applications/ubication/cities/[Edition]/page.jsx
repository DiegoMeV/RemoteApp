import { NoAccessCard, useListCities } from '@/lib'
import { ViewEditionCitie } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionCity = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoCitie,
    isLoading,
    isError,
  } = useListCities({ qry: `${idEdition}?aumentarInfo=true`, enabled: idEdition !== 'new' })
  return (
    <AccessControl
      privilege={
        idEdition === 'new' ? 'cgr.alertas.crear_municipios' : 'cgr.alertas.editar_municipios'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionCitie
        infoCitie={infoCitie}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionCity
