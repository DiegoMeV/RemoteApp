import { Button, Typography } from '@mui/material'
import { baseUrls } from '@/lib'

const ButtonAuthMicrosoft = ({ setIsLoadingButton }) => {
  const urlAuthGoogle = `${baseUrls.urlUsers}/auth/azure/signin`
  return (
    <Button
      type='button'
      fullWidth
      variant='outlined'
      size='large'
      href={urlAuthGoogle}
      onClick={() => setIsLoadingButton(true)}
    >
      <img
        src='./assets/svg/logoMicrosoft.svg'
        alt='logo-microsoft'
        width={20}
        height={20}
      />
      <Typography
        whiteSpace='nowrap'
        textTransform='none'
        ml={1}
        sx={{ fontSize: '0.7rem' }}
      >
        Inicio Microsoft
      </Typography>
    </Button>
  )
}

export default ButtonAuthMicrosoft
