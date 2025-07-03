import { Autocomplete, Grid, TextField } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { Controller } from 'react-hook-form'

const AutocompleteDependencies = ({ control, md, px, disabled }) => {
  const userData = useStoreState((state) => state.user.userData || [])

  return (
    <Grid
      item
      xs={12}
      md={md ?? 6}
      pt={3}
      px={px ?? 2}
    >
      <Controller
        control={control}
        name='dependency'
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field.value ?? null}
            fullWidth
            onChange={(_, newValue) => field.onChange(newValue)}
            options={userData?.dependencies ?? []}
            getOptionLabel={(option) => option?.name ?? ''}
            noOptionsText='No tiene dependencias'
            disabled={disabled ?? false}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                label='Selección de dependencia'
                required={true}
              />
            )}
            sx={{ '& .MuiInputBase-root': { backgroundColor: 'backgroundWhite1' } }}
          />
        )}
      />
    </Grid>
  )
}

export default AutocompleteDependencies
