import { NoAccessCard, useGetActingTypes, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { ViewActingTypes } from './views'
import { columnsActingTypes } from './funcs'
import { AccessControl } from '@/libV4'

const ActingTypes = () => {
  const navigate = useNavigate()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_tipos_actuacion')
  const searchActingType = useSearch()
  const {
    data: actingTypes,
    isFetching,
    isError,
  } = useGetActingTypes({
    qry: searchActingType.searchText ? `?palabraClave=${searchActingType.searchText}` : '',
  })

  const addActingTypes = () => {
    navigate('/applications/actingTypes/new')
  }
  const columns = columnsActingTypes(navigate, hasPrivilege)
  const params = {
    actingTypes,
    isLoading: isFetching,
    isError,
    addActingTypes,
    columns,
    searchActingType,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_tipos_actuacion'
      nodeContent={<NoAccessCard />}
    >
      <ViewActingTypes {...params} />
    </AccessControl>
  )
}

export default ActingTypes
