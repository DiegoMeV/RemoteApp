import { Menu, Divider, Avatar, Box, Typography, CircularProgress, MenuList } from '@mui/material'
import { ClassicIconButton, useBoolean } from '@/lib'
import { useStoreState } from 'easy-peasy'
import { ChangePasswordModal } from '..'
import MenuItemUserMenu from './MenuItemUserMenu'
import useMenuUser from '../../hooks/useMenuUser'

const ButtonUser = ({ validateDirtyForm }) => {
  const userData = useStoreState((state) => state.user.userData)
  const companyData = useStoreState((state) => state.company.companyData)

  const modalChangePassword = useBoolean()

  const { stateVariables, stateFunctions } = useMenuUser(modalChangePassword, validateDirtyForm)

  const { anchorEl, open, menuItems, isLoadingImg, dataImage } = stateVariables
  const { handleClick, handleClose } = stateFunctions

  return (
    <>
      <Box sx={{ display: 'flex', alignItems: 'center', textAlign: 'center' }}>
        <ClassicIconButton
          title='Configuración de la cuenta'
          onClick={handleClick}
        >
          {isLoadingImg ? (
            <CircularProgress />
          ) : (
            <Avatar
              alt={''}
              sx={{ bgcolor: '#7f7f7f' }}
              src={dataImage?.url}
            >
              {userData?.firstName?.[0] ?? ''}
            </Avatar>
          )}
        </ClassicIconButton>
      </Box>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        disableScrollLock
      >
        {(companyData?.Company.urlIcon || companyData?.Company.urlLogo) && (
          <Box sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column', m: 2 }}>
            <img
              src={companyData?.Company.urlIcon || companyData?.Company.urlLogo}
              alt='company logo'
              width={60}
            />
          </Box>
        )}

        <Typography
          title='Datos del usuario'
          width='100%'
          p={2}
        >
          {companyData?.Company?.companyName ?? ''}
          <br />
          {(userData?.firstName ?? '') + ' ' + (userData?.lastName ?? '')}
          <br />
          {userData?.email ?? ''}
        </Typography>
        <Divider />
        <MenuList>
          {menuItems.map((item, index) => (
            <MenuItemUserMenu
              key={index}
              item={item}
            />
          ))}
        </MenuList>
      </Menu>
      {modalChangePassword?.show && (
        <ChangePasswordModal modalChangePassword={modalChangePassword} />
      )}
    </>
  )
}

export default ButtonUser
