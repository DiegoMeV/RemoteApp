import { MenuItem, TextField } from '@mui/material'
import { forwardRef } from 'react'

const GenericSelect = forwardRef(function GenericTextfield(props, ref) {
  const value = props?.value
    ? Array.isArray(props?.value)
      ? props?.value
      : [props.value]
    : props?.inputProps?.multiple
    ? []
    : props?.value === false
    ? false
    : ''

  const disabled = props?.options?.length === 0 ? true : props?.disabled ?? false

  const helperText = props?.options?.length === 0 ? 'No hay opciones' : props?.helperText ?? ''

  return (
    <TextField
      ref={ref}
      select
      fullWidth
      size='small'
      {...props}
      disabled={disabled}
      helperText={helperText}
      value={value}
      sx={{
        '& .MuiInputBase-root': {
          backgroundColor: 'backgroundWhite1',
        },
        ...props?.sx,
      }}
    >
      {props?.options?.map((option) => (
        <MenuItem
          key={option.value}
          value={option.value}
        >
          {option.label}
        </MenuItem>
      )) ?? <MenuItem>No hay opciones</MenuItem>}
    </TextField>
  )
})
GenericSelect.displayName = 'GenericSelect'

export default GenericSelect
