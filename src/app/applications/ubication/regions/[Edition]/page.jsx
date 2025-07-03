import { NoAccessCard, useListRegionsInfo } from '@/lib'
import { ViewEditionRegion } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionRegion = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoRegion,
    isLoading,
    isError,
  } = useListRegionsInfo({ enabled: idEdition !== 'new', qry: `/${idEdition}` })
  return (
    <AccessControl
      privilege={idEdition === 'new' ? 'cgr.alertas.crear_regiones' : 'cgr.alertas.editar_regiones'}
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionRegion
        infoRegion={infoRegion}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionRegion
