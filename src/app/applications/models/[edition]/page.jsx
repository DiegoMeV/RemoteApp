import { NoAccessCard, useListModelsInfo } from '@/lib'
import { ViewEditingModel } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionModel = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: infoModels,
    isLoading,
    isError,
  } = useListModelsInfo({ qry: `/${idEdition}`, enabled: idEdition !== 'new' })

  return (
    <AccessControl
      privilege={idEdition === 'new' ? 'cgr.alertas.crear_modelos' : 'cgr.alertas.editar_modelos'}
      nodeContent={<NoAccessCard />}
    >
      <ViewEditingModel
        infoModels={infoModels}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionModel
