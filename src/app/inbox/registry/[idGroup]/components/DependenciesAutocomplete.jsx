import { Autocomplete, TextField } from '@mui/material'
import { useStoreState } from 'easy-peasy'

const DependenciesAutocomplete = ({ errorInfo, infoProcess, setInfoProcess }) => {
  const userData = useStoreState((state) => state.user.userData || [])
  const options = userData.dependencies || []

  return (
    <Autocomplete
      size='small'
      fullWidth
      value={infoProcess?.dependenciesSelected}
      noOptionsText='No posee ninguna dependencia asignada'
      onChange={(event, newValue) => {
        setInfoProcess({ ...infoProcess, dependenciesSelected: newValue })
      }}
      inputValue={infoProcess?.dependenciesSelected?.name || ''}
      onInputChange={(event, newInputValue) => {
        setInfoProcess({
          ...infoProcess,
          dependenciesSelected: { ...infoProcess.dependenciesSelected, name: newInputValue },
        })
      }}
      id='dependences-autocomplete'
      options={options}
      getOptionLabel={(option) => option.name}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Seleccione una dependencia'
          required={true}
          error={!userData.dependencies || (errorInfo && !infoProcess.dependenciesSelected)}
          helperText={
            errorInfo && !infoProcess.dependenciesSelected && 'Debe seleccionar una dependencia'
          }
        />
      )}
      // sx={{ mb: { xs: 2, md: 0 } }}
    />
  )
}

export default DependenciesAutocomplete
