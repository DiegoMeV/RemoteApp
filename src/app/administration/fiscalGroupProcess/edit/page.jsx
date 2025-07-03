import { useNavigate } from 'react-router-dom'

const EditProcessTypeGroups = () => {
  const navigate = useNavigate()
  return navigate('/administration/groupProcess')
}

export default EditProcessTypeGroups
