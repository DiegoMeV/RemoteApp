import { useLogout } from '@/lib/hooks'
import {
  Brightness4,
  LockOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
} from '@mui/icons-material'
import { useStoreActions } from 'easy-peasy'
import { useState } from 'react'

const useMenuUser = ({ modalChangePassword, validateDirtyForm }) => {
  const setDark = useStoreActions((actions) => actions.darkTheme.setDark)

  const logout = useLogout()

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const menuItems = [
    {
      label: 'Mi perfil',
      icon: <ManageAccountsOutlined />,
      onClick: () => {
        validateDirtyForm('/myaccount')
        handleClose()
      },
    },
    {
      label: 'Cambiar modo',
      icon: <Brightness4 />,
      onClick: () => {
        setDark()
      },
    },
    {
      label: 'Cambiar contraseña',
      icon: <LockOutlined />,
      onClick: () => modalChangePassword?.handleShow(),
    },
    {
      label: 'Cerrar sesión',
      icon: <LogoutOutlined />,
      onClick: () => {
        logout()
      },
    },
  ]

  const stateVariables = {
    anchorEl,
    open,
    menuItems,
    id,
  }
  const stateFunctions = {
    handleClick,
    handleClose,
  }

  return { stateVariables, stateFunctions }
}

export default useMenuUser
