import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { ClassicIconButton } from '../buttons'
import { Search } from '@mui/icons-material'

const AutocompleteNoForm = ({
  options,
  value,
  onChange,
  getOptionLabel,
  getOptionValue,
  label,
  size,
  placeholder,
  handleSearch,
  openModal,
  isLoading,
  error,
  helperText,
  required,
  setter,
  idSearch,
  backgroundColor = 'backgroundWhite1',
}) => {
  const getOptionLabelNative = (option) => option?.name ?? option?.nombre ?? ''
  const getOptionValueNative = (option, value) =>
    setter ? option[setter] === value[setter] : option?.id === value?.id
  return (
    <Autocomplete
      options={options ?? []}
      size={size ?? 'small'}
      fullWidth
      value={
        typeof value === 'object' && value !== null
          ? value
          : options?.find((option) => (idSearch ? option.id_usuario : option.id) === value) ?? null
      }
      getOptionLabel={getOptionLabel ?? getOptionLabelNative ?? null}
      isOptionEqualToValue={getOptionValue ?? getOptionValueNative ?? null}
      onChange={(_, newValue) => {
        onChange?.(newValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required ?? false}
          error={error}
          helperText={helperText}
          placeholder={placeholder ?? ''}
          label={label ?? ''}
          onChange={(e) => handleSearch?.(e.target.value)}
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor,
            },
          }}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <ClassicIconButton
                title='Lista de valores'
                onClick={() => openModal?.()}
              >
                <Search />
              </ClassicIconButton>
            ),
          }}
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
  )
}

export default AutocompleteNoForm
