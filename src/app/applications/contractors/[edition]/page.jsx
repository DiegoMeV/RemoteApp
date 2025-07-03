import { NoAccessCard, useGetContractors } from '@/lib'
import { ViewEditionContractors } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionContractor = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoEditing,
    isLoading: loadingInfoRow,
    isError,
  } = useGetContractors({ qry: `/${idEdition}?aumentarInfo=true`, enabled: idEdition !== 'new' })
  const title =
    idEdition === 'new'
      ? 'Creación de un nuevo contratista'
      : `Edición de ${infoEditing?.data?.[0]?.nombre_1 ?? ''} ${
          infoEditing?.data?.[0]?.apellido_1 ?? ''
        }`
  return (
    <AccessControl
      privilege={
        idEdition === 'new' ? 'cgr.alertas.crear_contratistas' : 'cgr.alertas.editar_contratistas'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionContractors
        idEdition={idEdition}
        infoEditing={infoEditing}
        isError={isError}
        loadingInfoRow={loadingInfoRow}
        title={title}
      />
    </AccessControl>
  )
}

export default EditionContractor
