import { Autocomplete, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const AutocompleteTypeProcess = ({ control, processTypes, md, disabled }) => {
  return (
    <Grid
      item
      xs={12}
      md={md ?? 6}
      pt={3}
      px={2}
    >
      <Controller
        control={control}
        name='processType'
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value ?? null}
            fullWidth
            onChange={(_, newValue) => field.onChange(newValue)}
            options={processTypes?.data ?? []}
            getOptionLabel={(option) => option?.name}
            disabled={disabled ?? false}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                label='Seleccione un tipo de proceso'
                required={true}
              />
            )}
          />
        )}
      />
    </Grid>
  )
}

export default AutocompleteTypeProcess
