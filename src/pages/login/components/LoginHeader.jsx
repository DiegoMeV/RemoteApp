import { Box, Typography } from '@mui/material'
import '../styles/styles.css'
import { stringToObject, svgs } from '@/libV4'

const LoginHeader = () => {
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')
  return (
    <div className='login_header'>
      <div className='login_header_text'>
        <Typography
          variant='h5'
          color={themeApp?.primary ? 'secondary' : 'primary'}
          sx={{ fontStyle: 'italic' }}
        >
          <Box
            mb={{ xs: '5', md: '15px' }}
            textAlign='start'
          >
            ¡Hola!
          </Box>
          <strong>Bienvenidos</strong>
        </Typography>
      </div>
      <img
        src={themeApp?.verticalImg || svgs.LogoSynchroxLogin}
        alt='Logo sychrox'
        style={{ width: 100, height: 100 }}
      />
    </div>
  )
}

export default LoginHeader
