import { useNavigate } from 'react-router-dom'

const DynamicForm = () => {
  const navigate = useNavigate()
  return navigate('/applications')
}

export default DynamicForm
