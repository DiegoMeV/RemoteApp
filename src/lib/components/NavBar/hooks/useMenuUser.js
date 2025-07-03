import { useState } from 'react'
import { useStoreActions, useStoreState } from 'easy-peasy'
import {
  Brightness4,
  LockOutlined,
  LogoutOutlined,
  ManageAccountsOutlined,
} from '@mui/icons-material'
import { useImage, useLogout } from '@/lib'

const useMenuUser = (modalChangePassword, validateDirtyForm) => {
  const userData = useStoreState((state) => state.user.userData)
  const setDark = useStoreActions((actions) => actions.darkTheme.setDark)

  const logout = useLogout()

  const { data: dataImage, isLoading: isLoadingImg } = useImage(userData?.preferences?.avatar)

  const [anchorEl, setAnchorEl] = useState(null)
  const open = Boolean(anchorEl)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }
  // TODO: You must add the pyrivlegio for each option
  const menuItems = [
    {
      label: 'Mi perfil',
      icon: <ManageAccountsOutlined />,
      onClick: () => {
        validateDirtyForm('/myaccount')
        handleClose
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
    isLoadingImg,
    dataImage,
  }
  const stateFunctions = {
    handleClick,
    handleClose,
  }

  return { stateVariables, stateFunctions }
}

export default useMenuUser
