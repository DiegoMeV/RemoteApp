import { Autocomplete, CircularProgress, LinearProgress, TextField } from '@mui/material'
import { Search } from '@mui/icons-material'
import { ClassicIconButton } from '../buttons'
import { forwardRef } from 'react'
import { isUUID } from '@/libV4'

const GenericAutocomplete = forwardRef(function GenericAutocomplete(props, ref) {
  const { autocompleteProps, textFieldProps, idField = 'id', ...rest } = props

  const { openModal, startAdornment, loadingValue, disabled, ...filteredAutocompleteProps } =
    autocompleteProps || {}

  const defaultGetOption =
    !isUUID(props?.value) && !isUUID(props?.autocompleteProps?.value) && idField === 'id'
      ? rest?.value ?? autocompleteProps?.value ?? null
      : autocompleteProps?.options?.find((option) => option?.[idField] == props?.value) ?? null

  const defaultGetOptionLabel = (options) =>
    options?.name ?? options?.nombre ?? `${options?.firstName ?? ''} ${options?.lastName ?? ''}`
  const defaultIsOptionEqualToValue = (option, value) => option?.id == value?.id

  const validateOptions =
    autocompleteProps?.options?.length > 0 || autocompleteProps?.options === undefined

  return (
    <Autocomplete
      getOptionLabel={defaultGetOptionLabel}
      isOptionEqualToValue={defaultIsOptionEqualToValue}
      {...rest}
      value={defaultGetOption}
      {...filteredAutocompleteProps} // Usar las props filtradas
      ref={ref} // Pasar el ref al componente Autocomplete interno
      options={autocompleteProps?.options ?? []}
      fullWidth
      disabled={disabled}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          size={textFieldProps?.size ?? 'small'}
          error={!!textFieldProps?.error} // Asegurarse de que `error` sea booleano
          InputProps={{
            ...params?.InputProps,
            startAdornment: startAdornment ?? (
              <>
                {loadingValue ? (
                  <CircularProgress size={20} />
                ) : (
                  <ClassicIconButton
                    title='Lista de valores'
                    onClick={() => openModal?.()} // Usar `openModal` aquí directamente
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
            ...autocompleteProps?.sx,
          }}
        />
      )}
      noOptionsText={
        autocompleteProps?.loadingOptions ? (
          <LinearProgress />
        ) : validateOptions ? (
          'Escribe para buscar'
        ) : (
          'No hay resultados'
        )
      }
    />
  )
})

export default GenericAutocomplete
