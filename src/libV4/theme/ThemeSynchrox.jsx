import { useEffect } from 'react'
import CssBaseline from '@mui/material/CssBaseline'
import { ThemeProvider } from '@mui/material'

import createCustomTheme from './TemaConfig'
import { useRootStore } from '../store'

// import Navbar from '@/components/layout/Navbar' todo: To be implemented in future tasks

//import { ProtectedRoute } from '../components' todo: To be implemented in future tasks

const ThemeSynchrox = ({ children }) => {
  // Status for dark/light theme
  const { dark } = useRootStore()
  // Creation of the customized theme
  const themeMUI = createCustomTheme(dark)

  // Effect to update the background of the body according to the theme
  useEffect(() => {
    document.body.style.backgroundColor = themeMUI.palette.background.default
    const rootElement = document.documentElement

    if (dark) {
      rootElement.classList.add('dark')
    } else {
      rootElement.classList.remove('dark')
    }
  }, [dark, themeMUI])

  return (
    <ThemeProvider theme={themeMUI}>
      <CssBaseline />
      <div
        className='App'
        style={{
          backgroundColor: themeMUI.palette.background.default,
          minHeight: '100vh',
        }}
      >
        {children}
      </div>
    </ThemeProvider>
  )
}

export default ThemeSynchrox
