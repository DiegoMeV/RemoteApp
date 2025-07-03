import { ViewVariables } from './views'
import { NoAccessCard, useGetVariables, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import columnsDef from './funcs/tableFun'
import { AccessControl } from '@/libV4'

const Variables = () => {
  const navigate = useNavigate()
  const searchVariables = useSearch()
  const {
    data: rows,
    isLoading: loadingRows,
    isError,
  } = useGetVariables({
    qry: searchVariables.searchText
      ? `?palabraClave=${searchVariables.searchText}&categoria=BLOQUE`
      : '?categoria=BLOQUE',
  })
  const hasPrivilege = usePrivileges('cgr.alertas.editar_variables')
  const addNewVariable = () => {
    navigate('/applications/variables/new')
  }

  const columns = columnsDef(navigate, hasPrivilege)
  const params = {
    columns,
    rows: rows?.data ?? [],
    loading: loadingRows,
    isError,
    searchVariables,
    addNewVariable,
  }
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_variables'}
      nodeContent={<NoAccessCard />}
    >
      <ViewVariables {...params} />
    </AccessControl>
  )
}

export default Variables
