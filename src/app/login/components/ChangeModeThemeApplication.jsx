import { useStoreActions, useStoreState } from 'easy-peasy'
import { Box, Button, Typography } from '@mui/material'

import Brightness4Icon from '@mui/icons-material/Brightness4'

import styles from '../styles/Login.module.css'

const ChangeModeThemeApplication = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const setDark = useStoreActions((action) => action.darkTheme.setDark)

  return (
    <Box
      className={styles.mode}
      onClick={() => setDark(!dark)}
      alignItems='center'
      alignSelf='flex-end'
      sx={{
        position: 'absolute',
        top: 0,
        right: 0,
        p: { xs: 0, md: 1 },
        zIndex: 1000,
        '& > :not(style)': { pr: 1 },
      }}
    >
      <Button
        size='small'
        startIcon={<Brightness4Icon sx={{ color: '#D9D9D9' }} />}
      >
        <Typography
          sx={{ textTransform: 'none' }}
          title='Cambia de tema'
          color='#D9D9D9'
          display={{ xs: 'none', md: 'block' }}
        >
          Cambiar modo
        </Typography>
      </Button>
    </Box>
  )
}

export default ChangeModeThemeApplication
