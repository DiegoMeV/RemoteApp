import { ViewContracts } from './view'
import { NoAccessCard, useListContractsInfo, usePrivileges, useSearch } from '@/lib'
import { useStoreActions } from 'easy-peasy'
import { columnsContracts } from './funcs'
import { useNavigate } from 'react-router-dom'
import { createQuery } from '../funcs'
import { useModelPagination } from '../hooks'
import { AccessControl } from '@/libV4'

const Contracts = () => {
  const clearBackPathUrl = useStoreActions((actions) => actions.backPathUrl.clearBackPathUrl)
  const navigate = useNavigate()
  const searchContract = useSearch()
  const { model, handlePaginationModelChange } = useModelPagination()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_contratos')
  const param = createQuery({ search: searchContract, model })
  const {
    data: rows,
    isLoading: loadingRows,
    isError,
  } = useListContractsInfo({
    param,
  })

  const columns = columnsContracts(navigate, hasPrivilege)
  const addVariable = () => {
    clearBackPathUrl()
    navigate('/applications/contracts/new')
  }
  const params = {
    isError,
    searchContract,
    addVariable,
    columns: columns ?? [],
    loadingRows,
    rows: rows,
    model,
    handlePaginationModelChange,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_contratos'
      nodeContent={<NoAccessCard />}
    >
      <ViewContracts {...params} />
    </AccessControl>
  )
}

export default Contracts
