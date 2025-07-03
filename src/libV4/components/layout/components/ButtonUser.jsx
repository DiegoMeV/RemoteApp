import { ClassicIconButton, CustomModal, useBoolean } from '@/libV4/ui'
import { useMenuUser } from '../hooks'
import { Avatar, Box, CircularProgress, Popover } from '@mui/material'
import { ChangePasswordForm, InfoMenuUser } from '.'
import { boxPasswordModal } from '../styles/stylesSx'

const ButtonUser = ({ userData, dataImage, isLoadingImg, validateDirtyForm }) => {
  const modalChangePassword = useBoolean()

  const { stateVariables, stateFunctions } = useMenuUser({
    modalChangePassword,
    validateDirtyForm,
  })

  const { anchorEl, open, menuItems, id } = stateVariables
  const { handleClick, handleClose } = stateFunctions

  return (
    <>
      <div className='flex items-center text-center'>
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
      </div>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <InfoMenuUser
          userData={userData}
          menuItems={menuItems}
        />
      </Popover>
      {modalChangePassword?.show && (
        <CustomModal
          open={modalChangePassword.show}
          handleClose={modalChangePassword.handleShow}
          size='sm'
        >
          <Box sx={boxPasswordModal}>
            <ChangePasswordForm handleClose={modalChangePassword.handleShow} />
          </Box>
        </CustomModal>
      )}
    </>
  )
}

export default ButtonUser
