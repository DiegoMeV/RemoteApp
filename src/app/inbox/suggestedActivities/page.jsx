import { useNavigate } from 'react-router-dom'

const SuggestedActivities = () => {
  const navigate = useNavigate()
  return navigate('/inbox')
}

export default SuggestedActivities
