import { Stack, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import styles from '../styles/noAccessCard.module.css'

const AccessCardData = () => {
  const userData = useStoreState((state) => state.user.userData)
  return (
    <Stack
      justifyContent='center'
      alignItems={{ xs: 'center', md: 'flex-start' }}
      textAlign={{ xs: 'center', md: 'left' }}
      sx={{
        p: (theme) => {
          return {
            xs: theme.spacing(5, 3, 0, 3),
            md: theme.spacing(5),
          }
        },
      }}
    >
      <Typography
        paragraph
        variant='h4'
        whiteSpace={'pre-line'}
      >
        {`No cuenta con los permisos necesarios para esta vista \n ${userData?.firstName} ${
          userData?.lastName || ''
        } 🚷`}
      </Typography>
      <Typography
        variant='h6'
        mb={{ xs: 3, xl: 5 }}
        className={styles.secondaryText}
      >
        Debe solicitar permisos al administrador
      </Typography>
    </Stack>
  )
}
export default AccessCardData
