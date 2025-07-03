import { Autocomplete, LinearProgress, TextField } from '@mui/material'

const ProcessAutocomplete = ({ processTypes, setInfoProcess, infoProcess, errorInfo }) => {
  return (
    <Autocomplete
      size='small'
      fullWidth
      noOptionsText={
        processTypes?.isLoading ? <LinearProgress /> : 'Este grupo no tiene procesos asociados'
      }
      value={infoProcess?.processSelected || null}
      getOptionLabel={(option) => option?.name}
      isOptionEqualToValue={(option, value) => option?.id === value?.id}
      onChange={(event, newValue) => {
        setInfoProcess({ ...infoProcess, processSelected: newValue })
      }}
      id='process-autocomplete'
      options={processTypes?.processTypes?.data ?? []}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Seleccione un tipo de proceso'
          required={true}
          error={!errorInfo?.processSelected && errorInfo}
          helperText={
            !errorInfo?.processSelected && errorInfo ? 'Debe seleccionar un tipo de proceso' : ''
          }
        />
      )}
    />
  )
}

export default ProcessAutocomplete
