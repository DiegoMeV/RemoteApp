import { NoAccessCard, useGetVariables } from '@/lib'
import { ViewEditionVariables } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionVariables = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoVariables,
    isLoading,
    isError,
  } = useGetVariables({
    qry: idEdition ? `/${idEdition}` : null,
    enabled: idEdition !== 'new',
  })
  return (
    <AccessControl
      privilege={
        idEdition === 'new' ? 'cgr.alertas.crear_variables' : 'cgr.alertas.editar_variables'
      }
      noAccessComponent={<NoAccessCard />}
    >
      <ViewEditionVariables
        infoVariables={infoVariables}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionVariables
