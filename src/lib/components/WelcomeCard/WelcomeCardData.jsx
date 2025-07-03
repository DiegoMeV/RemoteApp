import { Button, Stack, Typography } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { secondaryText } from './styles/stylesCard'

const WelcomeCardData = ({ showTutorialButton = false, text }) => {
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
        {text}
      </Typography>

      {showTutorialButton && (
        <Button
          variant='contained'
          color='primary'
        >
          video tutorial
        </Button>
      )}
    </Stack>
  )
}
export default WelcomeCardData
