import { ClassicIconButton } from '@/lib'
import { Search } from '@mui/icons-material'
import { Autocomplete, CircularProgress, Grid, LinearProgress, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const AutocompleteControl = ({
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
  disabled,
  getValues,
  toggleDisabled,
  getLabel,
  required,
  errorMsj,
  valueId,
}) => {
  const getLabelDefault = (option) =>
    option.name ??
    option.nombre ??
    option.identificador ??
    option.neighborhood ??
    option.identifier ??
    ''
  return (
    <Grid
      item
      xs={12}
      md={md ?? 12}
      sx={style}
      display='flex'
    >
      <Controller
        name={name}
        control={control}
        rules={{ required: required ? errorMsj ?? 'Este campo es requerido' : false }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            value={
              typeof field?.value === 'object' && field?.value !== null
                ? field?.value
                : options?.find(
                    (option) => (valueId ? option.criterio_id : option.id) === field?.value
                  ) ?? null
            }
            fullWidth
            disabled={disabled}
            onInputChange={(e, value) => {
              if (value === '') {
                setValue(name, null)
                getValues?.(null)
                handleSearchText?.('')
              }
            }}
            options={options ?? []}
            getOptionDisabled={
              typeof toggleDisabled === 'function' ? (option) => toggleDisabled(option) : false
            }
            getOptionLabel={getLabel ?? getLabelDefault}
            isOptionEqualToValue={(option, value) => option?.id === (value?.id ?? value)}
            onChange={(event, newValue) => {
              setValue(name, newValue)
              getValues?.(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                // required={required}
                label={`${label ?? ''}${required ? '*' : ''}`}
                InputLabelProps={{ shrink: true }}
                onChange={(e) => handleSearchText(e.target.value)}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      {isLoading ? (
                        <CircularProgress
                          color='inherit'
                          size={20}
                        />
                      ) : (
                        <ClassicIconButton
                          title='Lista de valores'
                          onClick={onClick}
                          disabled={disabled}
                          sx={{
                            height: '25px',
                            width: '25px',
                          }}
                        >
                          <Search />
                        </ClassicIconButton>
                      )}
                    </>
                  ),
                }}
                sx={{
                  '& .MuiInputBase-root': {
                    backgroundColor: 'backgroundWhite1',
                  },
                }}
                error={!!error}
                helperText={error ? error.message : null}
                autoComplete='off'
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

export default AutocompleteControl
