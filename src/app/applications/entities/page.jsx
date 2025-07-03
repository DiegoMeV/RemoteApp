import { NoAccessCard, useGetEntities, usePrivileges, useSearch } from '@/lib'
import { ViewEntity } from './views'
import { useNavigate } from 'react-router-dom'
import { columnsTableEntities, qryBuilderEntities } from './funcs'
import { useState } from 'react'
import { useGridApiRef } from '@mui/x-data-grid-premium'
import { AccessControl } from '@/libV4'

const Entities = () => {
  const searchEntity = useSearch()
  const [model, setModel] = useState({ page: 0, pageSize: 50 })
  const qry = qryBuilderEntities({ search: searchEntity, model })
  const hasPrivilege = usePrivileges('cgr.alertas.editar_entidades')
  const {
    data: entities,
    isLoading,
    isError,
  } = useGetEntities({
    qry: qry,
  })
  const navigate = useNavigate()
  const apiRef = useGridApiRef()
  const addNewEntity = () => navigate('/applications/entities/new')
  const columns = columnsTableEntities(navigate, hasPrivilege)
  const params = {
    entities,
    isLoading,
    isError,
    columns,
    addNewEntity,
    searchEntity,
    model,
    setModel,
    apiRef,
  }

  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_entidades'
      nodeContent={<NoAccessCard />}
    >
      <ViewEntity {...params} />
    </AccessControl>
  )
}

export default Entities
