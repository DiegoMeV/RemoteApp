import { stringToObject } from '@/lib'
import { useStoreState } from 'easy-peasy'

export const useBackgroundColorSx = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')

  const backgroundImage =
    dark === 'dark'
      ? 'radial-gradient(50% 50% at 50% 50%, rgba(33, 150, 243, 0.50) 49.48%, rgba(246, 246, 246, 0.00) 100%)'
      : themeApp.primary
      ? 'radial-gradient(rgba(246, 246, 246, 0) 0%, #7f7f7f 70%)'
      : 'radial-gradient(rgba(246, 246, 246, 0) 0%, #1e88e5 70%)'

  return {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '1%',
    height: '100vh',
    backgroundImage: backgroundImage,
  }
}

export const redirectContainer = {
  display: 'flex',
  flexDirection: 'column',
  p: '0px 30px',
  rowGap: '20px',
}
