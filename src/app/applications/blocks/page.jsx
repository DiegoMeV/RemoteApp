import { ViewAlertBlocks } from './views'
import { NoAccessCard, useListBlocksInfo, usePrivileges, useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { useAlertBlocks } from './hooks'
import { AccessControl } from '@/libV4'

const Blocks = () => {
  const navigate = useNavigate()
  const searchBlocks = useSearch()
  const hasPrivilege = usePrivileges('cgr.alertas.editar_bloques')
  const {
    data: rows,
    isPending: loadingRows,
    isError,
  } = useListBlocksInfo({
    qry: searchBlocks.searchText ? `?palabraClave=${searchBlocks.searchText}` : '',
  })
  const { columns } = useAlertBlocks({ hasPrivilege })
  const addBlock = () => {
    navigate('/applications/blocks/new')
  }
  const params = { loadingRows, isError, columns, rows, addBlock, searchBlocks }
  return (
    <AccessControl
      privilege='cgr.alertas.visualizar_bloques'
      nodeContent={<NoAccessCard />}
    >
      <ViewAlertBlocks {...params} />
    </AccessControl>
  )
}

export default Blocks
