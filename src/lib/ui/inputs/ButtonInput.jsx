import { Button } from '@mui/material'

const ButtonInput = ({ item }) => {
  return (
    <Button
      variant='contained'
      fullWidth
      onClick={item?.onClick ?? null}
    >
      {item?.label}
    </Button>
  )
}

export default ButtonInput
