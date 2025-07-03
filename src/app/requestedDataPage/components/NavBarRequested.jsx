import { AppBar, Box, Button, Toolbar } from '@mui/material'

import { useNavigate } from 'react-router-dom'
import { NavBarContainer } from '../styles'

const NavBarRequested = () => {
  const navigate = useNavigate()

  return (
    <AppBar
      color='inherit'
      position='static'
    >
      <Toolbar>
        <Box sx={NavBarContainer}>
          <img
            src={'/assets/svg/dashboardLogo.svg'}
            alt='Logo Navbar'
            width={50}
            height={50}
          />
          <Button
            variant='contained'
            onClick={() => navigate('/')}
          >
            Iniciar sesión
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default NavBarRequested
