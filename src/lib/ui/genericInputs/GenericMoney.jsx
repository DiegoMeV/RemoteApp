import { TextField } from '@mui/material'
import NumericFormatCustom from './NumericFormatCustom'

const GenericMoney = ({ ...props }) => {
  return (
    <TextField
      fullWidth
      size='small'
      {...props}
      value={props?.value ?? ''}
      InputLabelProps={{
        shrink: true,
        ...props.InputLabelProps,
      }}
      InputProps={{
        inputComponent: NumericFormatCustom,
        inputProps: {
          thousandSeparator: true,
          prefix: '$ ',
          ...props.InputProps,
          sx: { textAlign: 'right' },
        },
      }}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'backgroundWhite1',
        },
        ...props?.sx,
      }}
    />
  )
}

export default GenericMoney
