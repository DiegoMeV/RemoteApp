import { Button, Typography } from '@mui/material'

const ButtonSiifWeb = ({ authOption, selectOption }) => {
  return (
    <Button
      type='button'
      fullWidth
      variant='outlined'
      size='large'
      onClick={() => {
        selectOption('SIIFWEB')
      }}
    >
      <img
        src='./assets/svg/logoSiffweb.svg'
        alt='logo-google'
        width={20}
        height={20}
      />
      <Typography
        whiteSpace='nowrap'
        textTransform='none'
        sx={{ fontSize: '0.7rem' }}
        ml={1}
      >
        {authOption?.['SIIFWEB'] ? 'Inicio principal' : 'Inicio SIIFWEB'}
      </Typography>
    </Button>
  )
}

export default ButtonSiifWeb
