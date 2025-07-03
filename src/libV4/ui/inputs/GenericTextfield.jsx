import { TextField } from '@mui/material'
import { forwardRef } from 'react'

const GenericTextfield = forwardRef(function GenericTextfield(props, ref) {
  return (
    <TextField
      fullWidth
      size='small'
      {...props}
      value={props?.value ?? ''}
      ref={ref}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'backgroundWhite1',
        },
        ...props?.sx,
      }}
    />
  )
})

GenericTextfield.displayName = 'GenericTextfield'

export default GenericTextfield
