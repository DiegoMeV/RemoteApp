import { Box, Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { stringToObject } from '@/lib/funcs'
import { imageStack } from './styles/stylesCard'

const ImageWelcomeCard = ({ imgProps, hasCompanyImg }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  const VerticalLogoSynchrox = themeApp.verticalImg || '/assets/svg/vertical-synchrox-logo.svg'
  const VerticalLogoSynchroxDark =
    themeApp.verticalImgDark || '/assets/svg/vertical-synchrox-logo-black.svg'

  return (
    <Stack
      component='div'
      py={{ xs: 5, md: 3 }}
      sx={{
        ...imageStack,
        ...(hasCompanyImg && {
          marginInlineEnd: { md: 8 },
          mb: { md: 3 },
        }),
      }}
    >
      <Box
        component='div'
        display='flex'
        justifyContent='center'
      >
        <img
          src={dark === 'dark' ? VerticalLogoSynchroxDark : VerticalLogoSynchrox}
          style={{
            width: '200px',
            height: 'auto',
            ...imgProps,
          }}
          alt='Imagen compnania'
        />
      </Box>
    </Stack>
  )
}
export default ImageWelcomeCard
