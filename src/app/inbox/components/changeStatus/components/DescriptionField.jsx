import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

export const DescriptionField = ({ control }) => (
  <Grid
    item
    xs={12}
  >
    <Controller
      name='descriptionProcess'
      control={control}
      rules={{ required: 'Este campo es requerido' }}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          label={'Motivo cambio de estado *'}
          variant='outlined'
          InputLabelProps={{ shrink: true }}
          multiline
          maxRows={3}
          helperText={error ? error.message : ''}
          error={!!error}
        />
      )}
    />
  </Grid>
)
