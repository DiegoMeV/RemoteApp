import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { ClassicIconButton } from '../buttons'
import { Search } from '@mui/icons-material'
import { forwardRef } from 'react'

const GenericAutocomplete = forwardRef(function GenericAutocomplete(props, ref) {
  const { autocompleteprops, textfieldprops, ...rest } = props
  const {
    loadingoptions = true,
    getId = 'id',
    openmodal = () => {},
    ...propsToAutocomplete
  } = autocompleteprops

  const defaultGetOptionLabel = (options) => options?.name ?? options?.nombre ?? ''
  const defaultIsOptionEqualToValue = (option, value) => {
    return option?.id === value?.id
  }
  const validateOptions =
    autocompleteprops?.options?.length > 0 || autocompleteprops?.options === undefined

  const initialValue =
    typeof props?.value === 'string'
      ? autocompleteprops?.options?.find((option) => option?.[getId] === props?.value)
      : props?.value

  return (
    <Autocomplete
      ref={ref}
      getOptionLabel={defaultGetOptionLabel}
      isOptionEqualToValue={defaultIsOptionEqualToValue}
      {...rest}
      {...propsToAutocomplete}
      value={initialValue ?? ''}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textfieldprops}
          size={textfieldprops?.size ?? 'small'}
          InputProps={{
            ...params?.InputProps,
            startAdornment: autocompleteprops?.startadornment ?? (
              <ClassicIconButton
                disabled={rest?.disabled ?? false}
                title='Lista de valores'
                onClick={() => openmodal?.()}
                data-testid='modal-button'
                sx={{
                  height: '25px',
                  width: '25px',
                }}
              >
                <Search />
              </ClassicIconButton>
            ),
          }}
          sx={{
            '& .MuiInputBase-root': {
              backgroundColor: 'backgroundWhite1',
            },
            ...autocompleteprops?.sx,
          }}
        />
      )}
      noOptionsText={
        loadingoptions ? (
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
GenericAutocomplete.displayName = 'GenericAutocomplete'

export default GenericAutocomplete
