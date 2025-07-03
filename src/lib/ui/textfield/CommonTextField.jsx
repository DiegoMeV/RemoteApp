import { TextField } from '@mui/material'

const CommonTextField = ({
  label,
  value,
  name,
  multiline,
  minRows,
  maxRows,
  handleChange,
  size,
  id,
  disabled,
  handleClick,
  required,
  sx = {},
  type = 'text',
  helperText,
  handleBlur = () => {},
}) => {
  return (
    <TextField
      id={id}
      size={size ?? 'small'}
      value={value}
      sx={sx}
      type={type}
      disabled={disabled}
      fullWidth
      required={required ?? false}
      multiline={multiline}
      minRows={minRows}
      maxRows={maxRows}
      label={label}
      variant='outlined'
      name={name}
      autoComplete='off'
      onChange={(event) => handleChange(event)}
      onBlur={(event) => handleBlur(event)}
      onClick={handleClick}
      InputLabelProps={{ shrink: true }}
      helperText={helperText ?? ''}
    />
  )
}

export default CommonTextField
