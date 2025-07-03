import { Stack } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import '../styles/styles.css'

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
      <p className='text-[1.75rem] font-medium whitespace-pre-line'>
        {`No cuenta con los permisos necesarios para esta vista \n ${userData?.firstName} ${
          userData?.lastName || ''
        } 🚷`}
      </p>
      <h6 className='secondary-text'>Debe solicitar permisos al administrador</h6>
    </Stack>
  )
}
export default AccessCardData
