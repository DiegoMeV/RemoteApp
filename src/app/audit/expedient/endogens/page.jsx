import { useNavigate } from 'react-router-dom'
import { ViewEndogens } from './view'
import {  useSearch } from '@/lib'
import { columnsEndogens } from './columnsTable'

const Endogens = () => {
  const navigate = useNavigate()
  const searchEndogens = useSearch()
  const columns = columnsEndogens({ navigate })
  const handleCreate = () => {
    navigate('/audit/expedient/endogens/create')
  }

  return (
    <ViewEndogens
      handleCreate={handleCreate}
      columns={columns}
      searchEndogens={searchEndogens}
    />
  )
}

export default Endogens
