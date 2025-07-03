import { Box, Typography } from '@mui/material'

const UserInfoChangePass = ({ infoUserSelected } = {}) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1, pb: 2 }}>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Typography
          variant='body1'
          fontWeight='bold'
        >
          Nombre:
        </Typography>
        <Typography variant='body1'>
          {infoUserSelected?.firstName} {infoUserSelected?.lastName}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', gap: '5px' }}>
        <Typography
          variant='body1'
          fontWeight='bold'
        >
          Correo:
        </Typography>
        <Typography variant='body1'>{infoUserSelected?.email}</Typography>
      </Box>
    </Box>
  )
}

export default UserInfoChangePass
