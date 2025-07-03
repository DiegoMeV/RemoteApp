import { Grid, TextField } from '@mui/material'

const CustomTextfield = ({
  label,
  value,
  type,
  error,
  fontWeight,
  readOnly = true,
  xs = 12,
  lg = 6,
  fontSize,
  md = 6,
}) => {
  const multiline = type === 'multiline'
  return (
    <Grid
      item
      xs={xs}
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
          },
        }}
        InputLabelProps={{ shrink: true }}
        sx={{ marginY: '5px' }}
      />
    </Grid>
  )
}

export default CustomTextfield
