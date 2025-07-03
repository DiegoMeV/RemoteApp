import { navbarContainer } from '@/lib/components/NavBar/styles/stylesSx'
import { AppBar, Box, Toolbar } from '@mui/material'

import React from 'react'

const NavbarQrDocView = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        color='inherit'
        position='static'
      >
        <Toolbar>
          <Box sx={navbarContainer}>
            <img
              src={'/assets/svg/dashboardLogo.svg'}
              alt='Logo Navbar'
              width={50}
              height={50}
              style={{ cursor: 'pointer' }}
            />
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavbarQrDocView
