import { NoAccessCard, useGetActingTypes } from '@/lib'
import { ViewEditionActingTypes } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionActingTypes = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: actingTypes,
    isFetching,
    isError,
  } = useGetActingTypes({ qry: `/${idEdition}`, enabled: idEdition !== 'new' })

  return (
    <AccessControl
      privilege={
        idEdition === 'new'
          ? 'cgr.alertas.crear_tipos_actuacion'
          : 'cgr.alertas.editar_tipos_actuacion'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionActingTypes
        actingTypes={actingTypes}
        isLoading={isFetching}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionActingTypes
