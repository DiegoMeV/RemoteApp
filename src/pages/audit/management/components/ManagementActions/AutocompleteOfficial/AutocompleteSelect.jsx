import { Autocomplete, Grid, LinearProgress, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { RenderGroup, RenderOption } from '.'
import { ClassicIconButton } from '@/lib'
import { Search } from '@mui/icons-material'

const AutocompleteSelect = ({
  name,
  label,
  options,
  isLoading,
  handleSearch,
  control,
  setValue,
  openValueList,
  md,
  style,
  selectedUser,
  required,
}) => {
  return (
    <Grid
      item
      xs={12}
      md={md ?? 12}
      sx={style}
      display='flex'
    >
      <Controller
        name={name ?? ''}
        control={control}
        rules={{ required: required ? 'Este campo es requerido' : false }}
        render={({ field, fieldState: { error } }) => (
          <Autocomplete
            {...field}
            options={options ?? []}
            fullWidth
            filterOptions={(options) => options}
            isOptionEqualToValue={(option, value) => option.id === value.id}
            onChange={(_, newValue) => {
              selectedUser?.(newValue, setValue)
            }}
            getOptionLabel={(options) => options.hierarchy || ''}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={label ?? ''}
                label={`${label ?? ''}`}
                size='small'
                onChange={(e) => handleSearch(e.target.value)}
                InputLabelProps={{ shrink: true }}
                required={required}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: (
                    <ClassicIconButton
                      title='Lista de valores'
                      sx={{ height: '25px', width: '25px' }}
                      onClick={() => openValueList?.handleShow?.()}
                    >
                      <Search />
                    </ClassicIconButton>
                  ),
                }}
                error={!!error}
                helperText={error ? error.message : null}
                sx={{ backgroundColor: 'backgroundWhite1' }}
                inputProps={{ ...params.inputProps, required: false }}
              />
            )}
            groupBy={() => 'All Options'}
            renderGroup={(params) => <RenderGroup params={params} />}
            renderOption={(props, option) => {
              return (
                <RenderOption
                  props={props}
                  option={option}
                />
              )
            }}
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

export default AutocompleteSelect
