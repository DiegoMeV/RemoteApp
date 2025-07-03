import { useParams } from 'react-router-dom'
import { ViewEditUser } from './view'
import { AccessControl } from '@/libV4'

const EditUser = () => {
  const { idUser } = useParams()

  const accessPriv = idUser === 'new' ? 'usuarios.usuarios.agregar' : 'usuarios.usuarios.editar'

  return (
    <AccessControl privilege={accessPriv}>
      <ViewEditUser
        isNew={idUser === 'new'}
        idUser={idUser}
      />
    </AccessControl>
  )
}

export default EditUser
