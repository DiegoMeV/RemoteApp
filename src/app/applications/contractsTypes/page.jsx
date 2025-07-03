import { NoAccessCard, useGetTypeContracts, usePrivileges, useSearch } from '@/lib'
import { ViewConstractsTypes } from './views'
import { useNavigate } from 'react-router-dom'
import { columnsForContractsTypes } from './funcs'
import { AccessControl } from '@/libV4'

const ContractsTypes = () => {
  const navigate = useNavigate()
  const searchTypeContract = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_tipos_contrato')
  const {
    data: rows,
    isLoading: loadingRows,
    isError,
  } = useGetTypeContracts({
    qry: searchTypeContract.searchText ? `?palabraClave=${searchTypeContract.searchText}` : '',
  })

  const addNewTypeContract = () => {
    navigate('/applications/contractsTypes/new')
  }

  const columns = columnsForContractsTypes(navigate, hasPrivilege)
  const params = {
    searchTypeContract,
    rows: rows?.data ?? [],
    loadingRows,
    isError,
    columns,
    addNewTypeContract,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_tipos_contrato'
      nodeContent={<NoAccessCard />}
    >
      <ViewConstractsTypes {...params} />
    </AccessControl>
  )
}

export default ContractsTypes
