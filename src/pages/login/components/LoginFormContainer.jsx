import { stringToObject } from '@/libV4'
import { Box } from '@mui/material'

const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')
const backgroundImage = themeApp?.primary
  ? 'radial-gradient(rgba(246, 246, 246, 0) 0%, #7f7f7f 70%)'
  : 'radial-gradient(rgba(246, 246, 246, 0) 0%, #1e88e5 70%)'

const LoginFormContainer = ({ children }) => (
  <Box
    className='login_container'
    sx={{
      backgroundImage: backgroundImage,
      backgroundSize: 'cover',
    }}
  >
    <section className='login_card'>{children}</section>
  </Box>
)

export default LoginFormContainer
