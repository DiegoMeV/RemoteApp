import { Autocomplete, TextField } from '@mui/material'

const MultiChoiceAutocomplete = ({ options = [], value, onChange, label, required }) => {
  const getOptionLabel = (option) => {
    if (!option) return ''
    return option?.label || ''
  }

  return (
    <Autocomplete
      multiple
      options={options}
      value={value}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option.value === value?.value}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          size='small'
          label={label}
        />
      )}
    />
  )
}

export default MultiChoiceAutocomplete
