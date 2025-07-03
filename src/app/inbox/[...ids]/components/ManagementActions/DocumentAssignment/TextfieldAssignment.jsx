import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const TextfieldAssignment = ({
  control,
  multiline = false,
  name,
  isRequired,
  label,
  type,
  md,
  readOnly,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={multiline ? 12 : md ?? 6}
    >
      <Controller
        name={name ?? ''}
        control={control}
        rules={{ required: isRequired ? 'Este campo es requerido' : false }}
        render={({ field, fieldState: { error } }) => (
          <TextField
            {...field}
            size='small'
            fullWidth
            multiline={multiline}
            type={type ?? 'text'}
            minRows={4}
            label={`${label ?? ''}${isRequired ? '*' : ''}`}
            error={!!error}
            helperText={error ? error.message : ''}
            InputProps={{
              readOnly: readOnly ?? false,
            }}
            InputLabelProps={{ shrink: true }}
          />
        )}
      />
    </Grid>
  )
}

export default TextfieldAssignment
