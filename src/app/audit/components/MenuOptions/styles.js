import { useTheme } from '@emotion/react'

export const useStyles = () => {
  const theme = useTheme()

  return {
    stylesTitle: {
      margin: '20px 100px 10px 0px',
      backgroundColor: theme.palette.primary.main,
      padding: '10px',
      paddingRight: '200px',
      borderRadius: '0 20px 20px 0',
      color: theme.palette.primary.contrastText,
    },
  }
}
