import { useGridApiRef } from '@mui/x-data-grid-premium'
import { useStoreState } from 'easy-peasy'
import { recordColumns } from './funcs'
import { useNavigate } from 'react-router-dom'
import { ViewRecords } from './views'
import { usePrivileges, useQueryDynamicApi, useSearch } from '@/lib'
import { createPaginationQry } from '../../funcs'
import { useModelPagination } from '../../hooks'
const Records = () => {
  const hasEditPrivilege = usePrivileges('cgr.uri.editar_registros')
  const searchAlert = useSearch()
  const { model, handlePaginationModelChange } = useModelPagination()
  const qry = createPaginationQry({ search: searchAlert, model })
  const {
    data: dataRecord,
    isLoading,
    isError,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/registroAri/byUser${qry}&isTable=true`,
  })
  const apiRef = useGridApiRef()
  const navigate = useNavigate()
  const dark = useStoreState((state) => state.darkTheme.dark)
  const columns = recordColumns(navigate, hasEditPrivilege)
  const handleCreate = () => {
    navigate(`/applications/uri/registryUri`)
  }
  const recordProps = {
    dataRecord,
    columns,
    isLoading,
    isError,
    apiRef,
    dark,
    navigate,
    handleCreate,
    searchAlert,
    model,
    handlePaginationModelChange,
  }

  return <ViewRecords {...recordProps} />
}

export default Records
