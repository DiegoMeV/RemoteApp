import { ViewVariables } from './views'
import { NoAccessCard, useGetVariables, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import columnsDef from './funcs/tableFun'
import { AccessControl } from '@/libV4'

const VariablesContract = () => {
  const navigate = useNavigate()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_variables_contrato')
  const searchVariables = useSearch()
  const {
    data: rows,
    isLoading: loadingRows,
    isError,
  } = useGetVariables({
    qry: searchVariables.searchText
      ? `?palabraClave=${searchVariables.searchText}&categoria=CONTRATO`
      : '?categoria=CONTRATO',
  })

  const addNewVariableContract = () => {
    navigate('/applications/variablesContract/new')
  }

  const columns = columnsDef(navigate, hasPrivilege)
  const params = {
    columns,
    rows: rows?.data ?? [],
    loading: loadingRows,
    isError,
    searchVariables,
    addNewVariableContract,
  }
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_variables_contrato'}
      nodeContent={<NoAccessCard />}
    >
      <ViewVariables {...params} />
    </AccessControl>
  )
}

export default VariablesContract
