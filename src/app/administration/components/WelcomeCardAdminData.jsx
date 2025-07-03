import { Stack, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { useNavigate } from 'react-router-dom'
import { adminListOptions } from '../hooks'
import { secondaryText } from '../styles'
import { AccessControl, BasicListItem } from '@/libV4'

const WelcomeCardAdminData = () => {
  const navigate = useNavigate()
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
        {`Hola 👋 \n ${userData?.firstName} ${userData?.lastName || ''}`}
      </Typography>
      <Typography
        variant='h6'
        mb={{ xs: 3, xl: 5 }}
        sx={secondaryText}
      >
        Escoge una opción de administración
      </Typography>
      {adminListOptions?.map((option) => (
        <AccessControl
          key={option.id}
          privilege={option.privilege}
        >
          <BasicListItem
            key={option.id}
            icon={option.icon}
            label={option.label}
            onClick={() => navigate(option.path)}
            sx={{
              width: '100%',
            }}
          />
        </AccessControl>
      ))}
    </Stack>
  )
}
export default WelcomeCardAdminData
