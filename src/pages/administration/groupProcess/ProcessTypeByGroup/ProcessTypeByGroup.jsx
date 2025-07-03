import { useParams } from 'react-router-dom'
import { ViewPTByGroup } from './views'

const ProcessTypeByGroup = () => {
  const { idGroup } = useParams()

  return <ViewPTByGroup idGroup={idGroup} />
}

export default ProcessTypeByGroup
