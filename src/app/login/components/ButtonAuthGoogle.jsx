import { Button, Typography } from '@mui/material'
import { baseUrls } from '@/lib'

const ButtonAuthGoogle = ({ setIsLoadingButton }) => {
  const href = window.location.href

  const urlAuthGoogle = `${baseUrls?.urlUsers}/auth/login/federated/google?destination=${href}`
  return (
    <>
      <Button
        type='button'
        fullWidth
        variant='outlined'
        size='large'
        href={urlAuthGoogle}
        onClick={() => setIsLoadingButton(true)}
      >
        <img
          src='./assets/svg/logogoogle.svg'
          alt='logo-google'
          width={20}
          height={20}
        />
        <Typography
          whiteSpace='nowrap'
          textTransform='none'
          ml={1}
          sx={{ fontSize: '0.7rem' }}
        >
          Inicio Google
        </Typography>
      </Button>
    </>
  )
}

export default ButtonAuthGoogle
