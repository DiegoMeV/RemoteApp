import { Button } from '@mui/material'

const GenericButton = ({ ...props }) => {
  return (
    <Button
      variant='contained'
      fullWidth
      {...props}
      type={props?.typeButton ?? 'button'}
    >
      {props?.children ?? ''}
    </Button>
  )
}

export default GenericButton
