import { createTheme } from '@mui/material/styles'
import { stringToObject } from '../funcs/dataModifications'

const createCustomTheme = (mode) => {
  const isTheme = mode ? 'dark' : 'light'

  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')

  const theme = createTheme({
    palette: {
      mode: isTheme,
      ...(!mode
        ? {
            // palette values for light mode
            primary: {
              main: themeApp?.primary || '#1a73e8',
            },
            secondary: {
              main: '#757575',
            },
            backgroundAccordion: '#FFFFFF',
            backgroundCharts: '#FFFFFF',
            backgroundGray1: '#0000000f',
            backgroundGray2: '#DEDEDE',
            backgroundWhite1: '#FFFFFF',
            textfieldPrimary: '#f5f6ff',
            backgroundGray3: '#FAFAFA',
          }
        : {
            // palette values for dark mode
            primary: {
              main: '#FFFF',
            },
            secondary: {
              main: '#757575',
            },
            backgroundAccordion: '#1E1E1E',
            backgroundCharts: '#424242',
            backgroundGray1: '#000000cc',
            backgroundGray2: '#4C4C4C',
            backgroundWhite1: '#303030',
            textfieldPrimary: '',
            divider: '#757575',
            backgroundGray3: '#4C4C4C',
          }),
    },
    typography: {
      fontSize: 12,
    },
  })
  return theme
}

export default createCustomTheme
