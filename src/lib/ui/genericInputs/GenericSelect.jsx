import { MenuItem, TextField } from '@mui/material'

const GenericSelect = ({ ...props }) => {
  const value = props?.value
    ? Array.isArray(props?.value)
      ? props?.value
      : [props.value]
    : props?.inputProps?.multiple
    ? []
    : ''
  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: 250,
        overflowY: 'auto',
      },
    },
  }
  return (
    <TextField
      select
      fullWidth
      size='small'
      {...props}
      value={value}
      SelectProps={{ MenuProps }}
      InputLabelProps={{
        shrink: true,
        ...props.InputLabelProps,
      }}
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
      ))}
    </TextField>
  )
}

export default GenericSelect
