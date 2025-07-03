import { NoAccessCard, useGetEntities } from '@/lib'
import { ViewEditionEntity } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionEntity = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoEntity,
    isError,
    isFetching,
  } = useGetEntities({ enabled: idEdition !== 'new', qry: `/${idEdition}` })
  return (
    <AccessControl
      privilege={
        idEdition === 'new' ? 'cgr.alertas.crear_entidades' : 'cgr.alertas.editar_entidades'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionEntity
        infoEntity={infoEntity}
        isLoading={isFetching}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionEntity
