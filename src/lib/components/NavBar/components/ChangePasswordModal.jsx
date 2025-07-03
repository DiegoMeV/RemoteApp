import { CustomModal } from '@/lib/ui'
import { Box } from '@mui/material'
import ChangePasswordForm from './ChangePasswordForm'
import { boxPasswordModal } from '../styles/stylesSx'

const ChangePasswordModal = ({ modalChangePassword }) => {
  return (
    <CustomModal
      open={modalChangePassword.show}
      handleClose={modalChangePassword.handleShow}
      size='sm'
    >
      <Box sx={boxPasswordModal}>
        <ChangePasswordForm handleClose={modalChangePassword.handleShow} />
      </Box>
    </CustomModal>
  )
}

export default ChangePasswordModal
