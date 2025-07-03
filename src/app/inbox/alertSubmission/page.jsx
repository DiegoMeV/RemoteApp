import { useNavigate } from 'react-router-dom'

const AlertSubmission = () => {
  const navigate = useNavigate()
  return navigate('/inbox')
}

export default AlertSubmission
