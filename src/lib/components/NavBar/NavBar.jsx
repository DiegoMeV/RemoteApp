import { AppBar, Box, Toolbar } from '@mui/material'

import { navbarContainer } from './styles/stylesSx'
import { useStoreState } from 'easy-peasy'
import { stringToObject } from '@/lib/funcs'
import { excludeNavbarPaths } from './constants'
import { ButtonUser, OptionsNavBar } from './components'
import { useValidateDirtyForm } from '@/lib/hooks'
import { useLocation } from 'react-router-dom'

const NavBar = () => {
  const { pathname } = useLocation()
  const tokenData = useStoreState((state) => state.token.tokenData)
  const validateDirtyForm = useValidateDirtyForm()

  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  return (
    <>
      {!excludeNavbarPaths.includes(pathname) && tokenData?.token && (
        <Box sx={{ flexGrow: 1, paddingBottom: '65px' }}>
          <AppBar
            color='inherit'
            position='fixed'
          >
            <Toolbar>
              <Box sx={navbarContainer}>
                <img
                  src={themeApp.icon || '/assets/svg/dashboardLogo.svg'}
                  alt='Logo Navbar'
                  width={40}
                  height={40}
                  style={{ cursor: 'pointer' }}
                  onClick={() => {
                    if (pathname !== '/dashboard') {
                      validateDirtyForm('/dashboard')
                    }
                  }}
                />
                <OptionsNavBar validateDirtyForm={validateDirtyForm} />
                <ButtonUser validateDirtyForm={validateDirtyForm} />
              </Box>
            </Toolbar>
          </AppBar>
        </Box>
      )}
    </>
  )
}

export default NavBar
