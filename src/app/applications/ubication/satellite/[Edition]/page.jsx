import { NoAccessCard, useQueryDynamicApi } from '@/lib'
import { ViewEditionSatellite } from './view'
import { useParams } from 'react-router-dom'
import { AccessControl } from '@/libV4'

const EditionSatellite = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const {
    data: satelliteInfo,
    isLoading: loadingSatelliteInfo,
    isError: errorSatellite,
  } = useQueryDynamicApi({
    url: `/satelite/${idEdition}`,
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    enabled: idEdition !== 'new',
  })
  return (
    <AccessControl
      privilege={idEdition === 'new' ? 'cgr.alertas.crear_satelite' : 'cgr.alertas.editar_satelite'}
      nodeContent={<NoAccessCard />}
    >
      <ViewEditionSatellite
        satelliteInfo={satelliteInfo}
        isLoading={loadingSatelliteInfo}
        isError={errorSatellite}
        idEdition={idEdition}
      />
    </AccessControl>
  )
}

export default EditionSatellite
