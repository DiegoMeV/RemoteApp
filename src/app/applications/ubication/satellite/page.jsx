import { NoAccessCard, usePrivileges, useQueryDynamicApi, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsDef } from './funcs'
import { ViewSatellite } from './views'
import { AccessControl } from '@/libV4'

const Satellite = () => {
  const navigate = useNavigate()
  const searchSatellite = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_satelite')
  const {
    data: satelliteInfo,
    isFetching: loadingSatelliteInfo,
    isError: errorSatellite,
  } = useQueryDynamicApi({
    url: searchSatellite?.searchText
      ? `/satelite?palabraClave=${searchSatellite?.searchText}`
      : '/satelite',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
  })

  const addSatellite = () => {
    navigate('/applications/ubication/satellite/new')
  }

  const columns = columnsDef(navigate, hasPrivilege)
  const props = {
    loadingRows: loadingSatelliteInfo,
    isError: errorSatellite,
    columns,
    rows: satelliteInfo,
    addSatellite,
    searchSatellite,
  }
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_satelite'}
      nodeContent={<NoAccessCard />}
    >
      <ViewSatellite {...props} />
    </AccessControl>
  )
}

export default Satellite
