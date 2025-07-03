import NumericFormatCustom from '@/lib/ui/genericInputs/NumericFormatCustom'
import { TextField } from '@mui/material'
import { forwardRef } from 'react'

const MoneyDynamic = forwardRef(function MoneyDynami({ ...rest }, ref) {
  return (
    <TextField
      {...rest}
      ref={ref}
      fullWidth
      size='small'
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        inputComponent: NumericFormatCustom,
        inputProps: {
          thousandSeparator: true,
          prefix: '$ ',
          sx: { textAlign: 'right' },
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'backgroundWhite1',
        },
      }}
    />
  )
})

export default MoneyDynamic
