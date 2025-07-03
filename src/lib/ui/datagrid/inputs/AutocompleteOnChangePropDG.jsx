import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { useGridApiContext } from '@mui/x-data-grid-premium'
import { ClassicIconButton } from '../../buttons'
import { Search } from '@mui/icons-material'

const AutocompleteOnChangePropDG = (props) => {
  const apiRef = useGridApiContext()

  return (
    <Autocomplete
      options={props?.options ?? []}
      fullWidth
      getOptionLabel={(option) =>
        option?.identificador ?? option?.nombre ?? option?.name ?? option?.nombre_completo ?? ''
      }
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      value={props?.value ?? null}
      onChange={(_, newValue) => {
        props?.onChange?.(apiRef, props, newValue)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props?.label}
          onChange={(e) => props.searchUse?.handleSearchText(e?.target?.value ?? '')}
          InputProps={{
            ...params.InputProps,
            startAdornment: (
              <ClassicIconButton onClick={() => props?.openModal?.()}>
                <Search />
              </ClassicIconButton>
            ),
          }}
        />
      )}
      noOptionsText={
        props?.isLoading ? (
          <LinearProgress />
        ) : props?.isError ? (
          <>Ha ocurrido un error</>
        ) : props?.options === undefined ? (
          'Escribe para buscar'
        ) : (
          'No hay resultados'
        )
      }
    />
  )
}

export default AutocompleteOnChangePropDG
