import { createTheme } from '@mui/material/styles'

const createCustomTheme = (mode) => {
  // Ahora puedes usar themeApp de forma segura
  const theme = createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: {
              main: '#1a73e8',
            },
            secondary: {
              main: '#757575',
            },
            backgroundAccordion: '#FFFFFF',
            backgroundCharts: '#FFFFFF',
            backgroundGrey1: '#0000000f',
            backgroundGrey2: '#DEDEDE',
            backgroundWhite1: '#FFFFFF',
            textfieldPrimary: '#f5f6ff',
            backgroundGray3: '#FAFAFA',
            backgroundBlue1: '#E8EEF4',
            backgroundBlue2: '#3666CC',
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
            backgroundGrey1: '#000000cc',
            backgroundGrey2: '#4C4C4C',
            backgroundWhite1: '#303030',
            textfieldPrimary: '',
            divider: '#757575',
            backgroundGray3: '#4C4C4C',
          }),
    },
    typography: {
      fontSize: 12,
      customTitle: {
        color: '#7f7f7f',
        fontWeight: 700,
        fontSize: '1.375rem', // 22px en rem
        display: 'block',
      },
      customSubtitle: {
        color: '#7f7f7f',
        fontWeight: 500,
        fontSize: '1.125rem', // 18px en rem
        display: 'block',
      },
    },
  })
  return theme
}

export default createCustomTheme
