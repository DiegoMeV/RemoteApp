import { useStoreState } from 'easy-peasy'
import { CircularProgress, Typography } from '@mui/material'

import logoloading from '../../../../public/assets/svg/logoloading.svg'
import { LoadingStyles } from '@/lib/styles/index'
import { stringToObject } from '@/lib/funcs'
import { isEmpty } from '@/lib/utils'

const Loading = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')

  return (
    <div className={LoadingStyles.loading}>
      <header className={LoadingStyles.header}>
        <Typography
          className={LoadingStyles.welcome}
          sx={{
            color: dark === 'dark' ? '#FFF' : themeApp.primary || '#0d2c6b',
          }}
          variant='h5'
        >
          Cargando...
        </Typography>
        {!isEmpty(themeApp) ? (
          <CircularProgress color='primary' />
        ) : (
          <img
            src={logoloading}
            className={LoadingStyles.logo}
            alt='loading de Synchrox'
          />
        )}
      </header>
    </div>
  )
}

export default Loading
