import { NoAccessCard, useQueryDynamicApi } from '@/lib'
import { ViewEditionResultTypes } from './views'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionResultTypes = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: resultTypeInfo,
    isLoading,
    isError,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `tipoResultado/${idEdition}`,
    enabled: idEdition !== 'new',
  })

  return (
    <AccessControl
      privilege={
        idEdition === 'new'
          ? 'cgr.alertas.crear_tipos_resultado'
          : 'cgr.alertas.editar_tipos_resultado'
      }
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionResultTypes
        resultTypeInfo={resultTypeInfo}
        isLoading={isLoading}
        isError={isError}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionResultTypes
