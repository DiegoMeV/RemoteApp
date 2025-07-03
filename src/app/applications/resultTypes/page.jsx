import { NoAccessCard, usePrivileges, useQueryDynamicApi, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsResultTypes } from './funcs'
import { ViewResultTypes } from './views'
import { AccessControl } from '@/libV4'

const ResultTypes = () => {
  const navigate = useNavigate()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_tipos_resultado')
  const searchResultType = useSearch()
  const {
    data: resultTypesInfo,
    isLoading,
    isError,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `tipoResultado?palabraClave=${searchResultType?.searchText}`,
  })

  const addResultTypes = () => {
    navigate('/applications/resultTypes/new')
  }
  const columns = columnsResultTypes(navigate, hasPrivilege)
  const params = {
    resultTypesInfo,
    isLoading,
    isError,
    addResultTypes,
    columns,
    searchResultType,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_tipos_resultado'
      nodeContent={<NoAccessCard />}
    >
      <ViewResultTypes {...params} />
    </AccessControl>
  )
}

export default ResultTypes
