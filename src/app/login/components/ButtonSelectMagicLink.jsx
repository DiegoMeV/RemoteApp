import { Email } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'

const ButtonSelectMagicLink = ({ authOption, selectOption }) => {
  return (
    <Button
      type='button'
      fullWidth
      variant='outlined'
      size='large'
      onClick={() => {
        selectOption('MAGIC_LINK')
      }}
    >
      <Email />
      <Typography
        whiteSpace='nowrap'
        textTransform='none'
        sx={{ fontSize: '0.7rem' }}
        ml={1}
      >
        {authOption?.['MAGIC_LINK'] ? 'Inicio principal' : 'Link de acceso'}
      </Typography>
    </Button>
  )
}

export default ButtonSelectMagicLink
