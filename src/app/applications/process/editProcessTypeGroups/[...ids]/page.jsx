import { useParams } from 'react-router-dom'
import { ViewEditionGroup } from './views'

const EditionGroup = () => {
  const { idApplication, idGroup } = useParams()

  return (
    <>
      <ViewEditionGroup
        idApplication={idApplication}
        idGroup={idGroup}
      />
    </>
  )
}

export default EditionGroup
