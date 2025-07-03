import { NoAccessCard, useGetTypeContracts } from '@/lib'
import { ViewEditionContractType } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionTypeContract = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoContractsTypes,
    isLoading,
    isError,
  } = useGetTypeContracts({ qry: `/${idEdition}` })

  return (
    <AccessControl
      privilege={
        idEdition === 'new'
          ? 'cgr.alertas.crear_tipos_contrato'
          : 'cgr.alertas.editar_tipos_contrato'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionContractType
        infoContractsTypes={infoContractsTypes}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionTypeContract
