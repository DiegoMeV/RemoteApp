import { useNavigate } from 'react-router-dom'

const Expedient = () => {
  const navigate = useNavigate()
  return navigate('/audit/notify')
}

export default Expedient
