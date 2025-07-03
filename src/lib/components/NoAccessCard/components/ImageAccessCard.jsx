import { Box, Stack } from '@mui/material'
import styles from '../styles/noAccessCard.module.css'
import { useStoreState } from 'easy-peasy'
import { stringToObject } from '@/lib/funcs'

const ImageAccessCard = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')
  const VerticalLogoSynchrox = themeApp.verticalImg || '/assets/svg/vertical-synchrox-logo.svg'
  const VerticalLogoSynchroxDark =
    themeApp.verticalImgDark || '/assets/svg/vertical-synchrox-logo-black.svg'

  return (
    <Stack
      component='div'
      py={{ xs: 5, md: 3 }}
      className={styles.imageStack}
    >
      <Box
        component='div'
        display='flex'
        justifyContent='center'
      >
        <img
          src={dark === 'dark' ? VerticalLogoSynchroxDark : VerticalLogoSynchrox}
          alt='synchrox-logo'
          width={190}
          height={230}
        />
      </Box>
    </Stack>
  )
}
export default ImageAccessCard
