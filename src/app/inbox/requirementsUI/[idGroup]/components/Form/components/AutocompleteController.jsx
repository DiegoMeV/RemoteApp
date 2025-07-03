import { ClassicIconButton } from '@/lib'
import { Search } from '@mui/icons-material'
import { Autocomplete, Grid, LinearProgress, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const AutocompleteController = ({
  control,
  name,
  md,
  options,
  label,
  style,
  isLoading,
  handleSearchText,
  onClick,
  setValue,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={md ?? 12}
      sx={style}
    >
      <ClassicIconButton onClick={onClick}>
        <Search />
      </ClassicIconButton>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Autocomplete
            {...field}
            value={field?.value ?? ''}
            fullWidth
            options={options ?? []}
            getOptionLabel={(option) => option?.name ?? option?.nombre ?? ''}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            onChange={(event, newValue) => {
              setValue(name, newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                label={label}
                required={true}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleSearchText(e.target.value)}
              />
            )}
            noOptionsText={
              isLoading ? (
                <LinearProgress />
              ) : options === undefined ? (
                'Escribe para buscar'
              ) : (
                'No hay resultados'
              )
            }
          />
        )}
      />
    </Grid>
  )
}

export default AutocompleteController
