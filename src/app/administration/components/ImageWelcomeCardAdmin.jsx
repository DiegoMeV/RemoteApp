import { Box, Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { imageStack } from '../styles'
import { stringToObject } from '@/lib'

const ImageWelcomeCardAdmin = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  const VerticalLogoSynchrox = themeApp.verticalImg || '/assets/svg/vertical-synchrox-logo.svg'
  const VerticalLogoSynchroxDark =
    themeApp.verticalImgDark || '/assets/svg/vertical-synchrox-logo-black.svg'

  return (
    <Stack
      component='div'
      py={{ xs: 5, md: 3 }}
      sx={imageStack}
    >
      <Box
        component='div'
        display='flex'
        justifyContent='center'
      >
        <img
          src={dark === 'dark' ? VerticalLogoSynchroxDark : VerticalLogoSynchrox}
          style={{
            width: '100%',
            minWidth: '200px',
            maxWidth: '250px',
            height: 'auto',
          }}
          alt='Imagen compnania'
        />
      </Box>
    </Stack>
  )
}
export default ImageWelcomeCardAdmin
