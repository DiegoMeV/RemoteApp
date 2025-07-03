import { NoAccessCard, useGetDomains, usePrivileges, useSearch } from '@/lib'
import { ViewDomains } from './views'
import { typeDomain } from '../../constants'
import { useNavigate, useParams } from 'react-router-dom'
import { columnsTableResources } from './funcs'
import { privileges } from './constants'
import { AccessControl } from '@/libV4'

const SubPagesDomains = () => {
  const params = useParams()
  const searchDomain = useSearch()
  const subpage = params.subpage || ''
  const hasPrivilege = usePrivileges(`cgr.alertas.crear_${privileges[subpage]}`)
  const type = typeDomain[subpage] || ''
  const { data: infoDomains, isLoading: loadingDomains } = useGetDomains({
    qry: searchDomain?.searchText
      ? `?tipo=${type}&palabraClave=${searchDomain.searchText}`
      : `?tipo=${type} `,
  })
  const value = privileges[subpage]
  const navigate = useNavigate()
  const columns = columnsTableResources(navigate, subpage, hasPrivilege)
  const addNewVariable = () => {
    navigate(`/applications/domains/${subpage}/new`)
  }
  const paramComponent = {
    infoDomains,
    loadingDomains,
    subpage,
    columns,
    addNewVariable,
    searchDomain,
  }
  return (
    <AccessControl
      privilege={`cgr.alertas.visualizar_${value}`}
      nodeContent={<NoAccessCard />}
    >
      <ViewDomains {...paramComponent} />
    </AccessControl>
  )
}

export default SubPagesDomains
