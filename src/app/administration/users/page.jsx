import { useState } from 'react'
import { ViewUsers } from './views'
import { usePrivileges, useSearch } from '@/lib'
import { AccessControl } from '@/libV4'
import { useUsersManagement } from './hooks'

const Users = () => {
  const [isActive, setIsActive] = useState(true)
  const searchUser = useSearch()

  const addAccess = usePrivileges('usuarios.usuarios.agregar')
  const editAccess = usePrivileges('usuarios.usuarios.editar')
  const editPassword = usePrivileges('usuarios.administracion.cambiar_contrasena')

  const paramsFilter = {
    isActive,
    searchUser,
    setIsActive,
  }

  const usersProps = useUsersManagement({
    searchUser,
    isActive,
    editAccess,
    editPassword,
    addAccess,
  })

  const propsViewTable = { paramsFilter, ...usersProps }

  return (
    <AccessControl privilege='usuarios.usuarios.listar'>
      <ViewUsers {...propsViewTable} />
    </AccessControl>
  )
}

export default Users
