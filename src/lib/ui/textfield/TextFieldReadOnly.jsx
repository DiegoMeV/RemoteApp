import { Grid, TextField } from '@mui/material'

const TextFieldReadOnly = ({
  label,
  value,
  type,
  error,
  fontWeight,
  readOnly = true,
  lg = 6,
  fontSize,
  md = 6,
}) => {
  const multiline = type === 'multiline'
  return (
    <Grid
      item
      xs={12}
      md={md}
      lg={lg}
    >
      <TextField
        size='small'
        label={label}
        value={value}
        error={error}
        multiline={multiline}
        minRows={2}
        fullWidth
        InputProps={{
          readOnly: readOnly,
          sx: {
            fontWeight: fontWeight,
            fontSize: fontSize,
            fontStyle: error ? 'italic' : '',
            backgroundColor: 'white',
          },
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ marginY: '5px' }}
      />
    </Grid>
  )
}

export default TextFieldReadOnly
