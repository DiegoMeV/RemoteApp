import { Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import '../styles/styles.css'
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
      className='image-stack'
    >
      <div className='flex justify-center'>
        <img
          src={dark === 'dark' ? VerticalLogoSynchroxDark : VerticalLogoSynchrox}
          alt='synchrox-logo'
          width={190}
          height={230}
        />
      </div>
    </Stack>
  )
}
export default ImageAccessCard
