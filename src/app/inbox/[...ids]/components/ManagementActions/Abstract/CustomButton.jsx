import { Button } from '@mui/material'

const CustomButton = ({ onClick, icon, text }) => {
  return (
    <Button
      variant='contained'
      size='medium'
      fullWidth
      startIcon={icon}
      sx={{ marginBottom: '10px', fontSize: '10px' }}
      onClick={onClick}
    >
      {text}
    </Button>
  )
}

export default CustomButton
