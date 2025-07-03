import { useNavigate } from 'react-router-dom'
import { columnsTable } from './constants'
import { ViewMassiveGuides } from './view'

const MassiveGuides = () => {
  const navigate = useNavigate()
  const handleModalCreate = () => {
    navigate('/audit/massiveManagement/guides/create')
  }
  const columns = columnsTable({ navigate })
  return (
    <>
      <ViewMassiveGuides
        handleModalCreate={handleModalCreate}
        columns={columns}
      />
    </>
  )
}

export default MassiveGuides
