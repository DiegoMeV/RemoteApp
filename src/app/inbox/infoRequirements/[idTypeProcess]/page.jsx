// TODO: import AccessControl from '@/app/AccessControl'
import { useParams } from 'react-router-dom'
import { ViewInfoRequirements } from './views'

const InfoRequirements = () => {
  const params = useParams()
  const idTypeProcess = params.idTypeProcess

  //TODO: PETICION PARA TRAER EL NOMBRE DEL TIPO DE PROCESO

  return <ViewInfoRequirements idTypeProcess={idTypeProcess} />
}

export default InfoRequirements
