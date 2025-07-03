import { NoAccessCard, useGetProvince, usePrivileges, useSearch } from '@/lib'
import ViewProvidence from './views/ViewProvidence'
import { useNavigate } from 'react-router-dom'
import { columnsTableProvince } from './funcs'
import { AccessControl } from '@/libV4'

const Province = () => {
  const searchProvidence = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_departamentos')
  const {
    data: infoProvince,
    isLoading: loadingProvince,
    isError: isErrorProvince,
    isFetching: fechingProvince,
  } = useGetProvince({
    qry: searchProvidence?.searchText
      ? `?palabraClave=${searchProvidence.searchText}&aumentarInfo=true`
      : '?aumentarInfo=true',
  })
  const navigate = useNavigate()
  const columns = columnsTableProvince(navigate, hasPrivilege)
  const addProvidence = () => {
    navigate('/applications/ubication/province/new')
  }
  const params = {
    infoProvince,
    loadingProvince: loadingProvince || fechingProvince,
    isErrorProvince,
    addProvidence,
    columns,
    searchProvidence,
  }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_departamentos'
      nodeContent={<NoAccessCard />}
    >
      <ViewProvidence {...params} />
    </AccessControl>
  )
}

export default Province
