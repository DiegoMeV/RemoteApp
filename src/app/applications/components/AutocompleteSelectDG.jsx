import { Autocomplete, LinearProgress, TextField } from '@mui/material'
import { useGridApiContext } from '@mui/x-data-grid-premium'

const AutocompleteSelectDG = (props) => {
  const { id, value, field } = props

  const apiRef = useGridApiContext()

  const handleValueChange = (event, newValue) => {
    apiRef.current.setEditCellValue({ id, field, value: newValue || value })
  }

  return (
    <Autocomplete
      options={props.options ?? []}
      fullWidth
      getOptionLabel={(option) => option?.nombre ?? option?.name ?? ''}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      value={value ?? null}
      onChange={handleValueChange}
      renderInput={(params) => (
        <TextField
          {...params}
          placeholder={props.label}
          onChange={(e) => props?.searchUse?.handleSearchText(e.target.value)}
        />
      )}
      noOptionsText={
        props.isLoading ? (
          <LinearProgress />
        ) : props.options === undefined ? (
          'Escribe para buscar'
        ) : (
          'No hay resultados'
        )
      }
    />
  )
}

export default AutocompleteSelectDG
