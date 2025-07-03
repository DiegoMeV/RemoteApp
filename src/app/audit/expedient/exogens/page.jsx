import { ViewExogens } from './view'
import {  useSearch } from '@/lib'
import { useNavigate } from 'react-router-dom'
import { columnsExogens } from './columnsTable'

const Exogens = () => {
  const navigate = useNavigate()
  const searchExogens = useSearch()
  const handleModalCreate = () => {
    navigate('/audit/expedient/exogens/create')
  }
  const columns = columnsExogens({ navigate })
  return (
    <ViewExogens
      handleModalCreate={handleModalCreate}
      columns={columns}
      searchExogens={searchExogens}
    />
  )
}

export default Exogens
