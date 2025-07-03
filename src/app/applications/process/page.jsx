import { useNavigate } from 'react-router-dom'

const Process = () => {
  const navigate = useNavigate()
  return navigate('/applications')
}

export default Process
