import { ViewAlertRegions } from './views'
import { NoAccessCard, useListRegionsInfo, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsDef } from './funcs'
import { AccessControl } from '@/libV4'

const Regions = () => {
  const navigate = useNavigate()
  const searchRegion = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_regiones')
  const {
    data: rows,
    isLoading: loadingRows,
    isError,
  } = useListRegionsInfo({
    qry: searchRegion?.searchText ? `?palabraClave=${searchRegion.searchText}` : '',
  })

  const addRegion = () => {
    navigate('/applications/ubication/regions/new')
  }

  const columns = columnsDef(navigate, hasPrivilege)
  const props = { loadingRows, isError, columns, rows, addRegion, searchRegion }
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_regiones'}
      nodeContent={<NoAccessCard />}
    >
      <ViewAlertRegions {...props} />
    </AccessControl>
  )
}

export default Regions
