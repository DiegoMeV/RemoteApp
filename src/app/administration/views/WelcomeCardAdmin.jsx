import { Box, Stack } from '@mui/material'
import { ImageWelcomeCardAdmin, WelcomeCardAdminData } from '../components'
import { bakground } from '../constants'
import { welcomeCard } from '../styles'

const WelcomeCardAdmin = () => {
  return (
    <Box
      width='70%'
      pt='50px'
      mx='auto'
    >
      <Stack
        flexDirection={{ xs: 'column', md: 'row' }}
        sx={{
          ...bakground,
          ...welcomeCard,
        }}
      >
        <WelcomeCardAdminData />
        <ImageWelcomeCardAdmin />
      </Stack>
    </Box>
  )
}

export default WelcomeCardAdmin
