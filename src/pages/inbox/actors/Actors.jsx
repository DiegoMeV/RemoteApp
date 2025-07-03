import { useParams } from 'react-router-dom'
import { ViewActors } from './views'
import { AccessControl } from '@/libV4'

const Actors = () => {
  const { idProcess } = useParams()

  return (
    <AccessControl privilege='procesos.actores.listar'>
      <ViewActors idProcess={idProcess} />
    </AccessControl>
  )
}

export default Actors
