import { ViewAlertModels } from './views'
import { NoAccessCard, useListModelsInfo, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsForModels } from './funcs'
import { AccessControl } from '@/libV4'

const Models = () => {
  const navigate = useNavigate()
  const searchModel = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_modelos')
  const {
    data: models,
    isLoading: loadingRows,
    isError,
  } = useListModelsInfo({
    qry: searchModel.searchText ? `?palabraClave=${searchModel.searchText}` : '',
  })
  const { columns } = columnsForModels(navigate, hasPrivilege)

  const addNewModel = () => {
    navigate('/applications/models/new')
  }
  const params = {
    searchModel,
    models,
    loadingRows,
    isError,
    columns,
    addNewModel,
  }
  return (
    <AccessControl
      privilege={'cgr.alertas.visualizar_modelos'}
      nodeContent={<NoAccessCard />}
    >
      <ViewAlertModels {...params} />
    </AccessControl>
  )
}

export default Models
