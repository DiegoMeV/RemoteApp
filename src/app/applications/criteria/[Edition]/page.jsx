import { NoAccessCard, useGetCriteria } from '@/lib'
import { ViewEditionCriteria } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionCriteria = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoCriteria,
    isLoading,
    isError,
  } = useGetCriteria({ qry: `/${idEdition}`, enabled: idEdition !== 'new' })
  return (
    <AccessControl
      privilege={
        idEdition === 'new' ? 'cgr.alertas.crear_criterios' : 'cgr.alertas.editar_criterios'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionCriteria
        infoCriteria={infoCriteria}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionCriteria
