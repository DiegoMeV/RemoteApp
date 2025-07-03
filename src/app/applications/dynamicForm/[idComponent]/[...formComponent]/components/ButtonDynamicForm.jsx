import { safeExecute } from '@/lib'
import { Button } from '@mui/material'

const ButtonDynamicForm = ({ label, eventButton, sx, disabled }) => {
  return (
    <Button
      variant='contained'
      fullWidth
      disabled={disabled}
      sx={{ maxHeight: '40px', ...sx }}
      onClick={() => safeExecute(eventButton)}
    >
      {label}
    </Button>
  )
}

export default ButtonDynamicForm
