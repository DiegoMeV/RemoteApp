import { NoAccessCard, useGetVariables } from '@/lib'
import { ViewEditionVariablesContract } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionVariablesContract = () => {
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
        idEdition === 'new'
          ? 'cgr.alertas.crear_variables_contrato'
          : 'cgr.alertas.editar_variables_contrato'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionVariablesContract
        infoVariables={infoVariables}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionVariablesContract
