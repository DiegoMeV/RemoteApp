import { useEffect } from 'react'
import { useStoreState } from 'easy-peasy'

import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'

import createCustomTheme from './TemaConfig'

// import Navbar from '@/components/layout/Navbar' todo: To be implemented in future tasks

//import { ProtectedRoute } from '../components' todo: To be implemented in future tasks

const ThemeSynchrox = ({ children }) => {
  // Status for dark/light theme
  const dark = useStoreState((state) => state.darkTheme.dark)

  // Creation of the customized theme
  const theme = createCustomTheme(dark)

  // Effect to update the background of the body according to the theme
  useEffect(() => {
    document.body.style.backgroundColor = theme.palette.background.default
    const rootElement = document.documentElement
    if (dark === 'dark') {
      rootElement.classList.add('dark')
    } else {
      rootElement.classList.remove('dark')
    }
  }, [dark, theme])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div
        className='App'
        style={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}
      >
        {children}
      </div>
    </ThemeProvider>
  )
}

export default ThemeSynchrox
