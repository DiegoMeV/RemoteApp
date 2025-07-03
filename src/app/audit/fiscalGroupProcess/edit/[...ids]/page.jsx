import { useParams } from 'react-router-dom'
import { ViewEditionGroup } from './views'

const EditionGroup = () => {
  const { idGroup } = useParams()

  return (
    <>
      <ViewEditionGroup idGroup={idGroup} />
    </>
  )
}

export default EditionGroup
