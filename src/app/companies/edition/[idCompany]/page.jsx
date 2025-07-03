import { useParams } from 'react-router-dom'
import { ViewEditionCompany } from './view'

const EditionCompany = () => {
  const params = useParams()
  const idCompany = params.idCompany
  return <ViewEditionCompany idCompany={idCompany} />
}

export default EditionCompany
