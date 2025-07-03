import { Autocomplete, CircularProgress, LinearProgress, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { ClassicIconButton } from '../buttons'
import { Search } from '@mui/icons-material'

const AutocompleteSelect = ({ item, control, setValue }) => {
  const defaultGetOptionLabel = (options) =>
    options?.name ?? options?.nombre ?? options?.nombre_completo ?? ''

  return (
    <Controller
      name={item?.name}
      control={control}
      rules={{ required: item?.required ? 'Este campo es requerido' : false }}
      defaultValue={item?.defaultValue ?? null}
      render={({ field, fieldState: { error } }) => {
        const newHelperText = error ? error?.message : item?.helperText ?? ''
        const newLabel = `${item?.label ?? ''} ${item?.required ? '*' : ''}`
        const value = field?.value ? field.value : item?.multiple ? [] : null
        const getoption =
          typeof field?.value === 'object' && field?.value !== null
            ? value
            : item?.data?.find(
                (option) => option.id.toLowerCase() === field?.value?.toLowerCase()
              ) ?? null

        return (
          <Autocomplete
            multiple={item?.multiple ?? false}
            {...field}
            sx={{ ...item?.sx }}
            value={getoption}
            options={item?.data ?? []}
            getOptionLabel={item?.getOptionLabel ?? defaultGetOptionLabel}
            isOptionEqualToValue={(option, value) => option?.id === (value?.id ?? value)}
            disableCloseOnSelect={item?.disableCloseOnSelect ?? false}
            disabled={item?.disabled ?? false}
            onChange={async (_, newValue) => {
              field.onChange(newValue)
              await setValue(item?.name, newValue)
              item?.onChange?.(newValue)
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder={item?.placeholder ?? ''}
                error={!!error}
                label={newLabel}
                helperText={newHelperText}
                size='small'
                onChange={(e) => item?.handleSearch?.(e.target.value)}
                InputLabelProps={{ shrink: true }}
                InputProps={{
                  ...params.InputProps,
                  startAdornment: item?.multiple
                    ? params.InputProps.startAdornment
                    : item.openModal && (
                        <ClassicIconButton
                          title='Lista de valores'
                          onClick={() => item?.openModal?.()}
                          disabled={item?.isLoading ?? item?.disabled ?? false}
                          sx={{
                            height: '25px',
                            width: '25px',
                          }}
                        >
                          {item?.isLoading ? <CircularProgress size={24} /> : <Search />}
                        </ClassicIconButton>
                      ),
                }}
                sx={{
                  width: '100%',
                  '& .MuiInputBase-root': {
                    backgroundColor: 'backgroundWhite1',
                  },
                }}
              />
            )}
            noOptionsText={
              item?.isLoading ? (
                <LinearProgress />
              ) : item?.data === undefined ? (
                'Escribe para buscar'
              ) : (
                'No hay resultados'
              )
            }
          />
        )
      }}
    />
  )
}

export default AutocompleteSelect
