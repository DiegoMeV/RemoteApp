import { ViewContractors } from './views'
import { NoAccessCard, useGetContractors, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsForContractors } from './funcs'
import { useStoreActions } from 'easy-peasy'
import { AccessControl } from '@/libV4'

const Contractors = () => {
  const searchContractor = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_contratistas')
  const {
    data: rowsApi,
    isLoading: LoadingRowsApi,
    isError,
  } = useGetContractors({
    qry: `?aumentarInfo=true${
      searchContractor.searchText ? `&palabraClave=${searchContractor.searchText}` : ``
    }`,
  })
  const navigate = useNavigate()
  const columnsContractors = columnsForContractors(navigate, hasPrivilege)
  const clearBackPathUrl = useStoreActions((actions) => actions.backPathUrl.clearBackPathUrl)

  const addContractor = () => {
    clearBackPathUrl()
    navigate('/applications/contractors/new')
  }
  const params = {
    isError,
    searchContractor,
    addContractor,
    columnsContractors,
    rowsApi: rowsApi?.data ?? [],
    LoadingRowsApi,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_contratistas'
      nodeContent={<NoAccessCard />}
    >
      <ViewContractors {...params} />
    </AccessControl>
  )
}

export default Contractors
