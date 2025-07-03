import { useNavigate } from 'react-router-dom'

const Notes = () => {
  const navigate = useNavigate()
  return navigate('/inbox')
}

export default Notes
