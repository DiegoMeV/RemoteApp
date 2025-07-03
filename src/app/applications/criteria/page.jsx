import { NoAccessCard, useGetCriteria, usePrivileges, useSearch } from '@/lib'
import { ViewCriteria } from './views'
import { useNavigate } from 'react-router-dom'
import { columnsTableResources } from './funcs'
import { useState } from 'react'
import { createQuery } from '../funcs'
import { AccessControl } from '@/libV4'

const Criteria = () => {
  const navigate = useNavigate()
  const searchCriteria = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_criterios')
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const query = createQuery({ search: searchCriteria, model })
  const {
    data: infoCriteria,
    isLoading: loadingCriteria,
    isError: isErrorCriteria,
  } = useGetCriteria({
    qry: query,
  })
  const addRegion = () => {
    navigate('/applications/criteria/new')
  }
  const columns = columnsTableResources(navigate, hasPrivilege)
  const params = {
    infoCriteria,
    loadingCriteria,
    isErrorCriteria,
    addRegion,
    columns,
    searchCriteria,
    model,
    setModel,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_criterios'
      nodeContent={<NoAccessCard />}
    >
      <ViewCriteria {...params} />
    </AccessControl>
  )
}

export default Criteria
