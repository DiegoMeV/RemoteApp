import { Autocomplete, TextField } from '@mui/material'
import { useMemo } from 'react'

const CustomAutocomplete = ({ options, value, onChange, label, required }) => {
  const getOptionLabel = useMemo(() => {
    if (value === null || value === undefined || options.length === 0) return ''
    const currentOption = options.find((option) => option.value === value)
    return currentOption?.label || ''
  }, [value, options])

  return (
    <Autocomplete
      options={options}
      value={getOptionLabel}
      onChange={onChange}
      isOptionEqualToValue={(option, value) => option?.value === value}
      renderInput={(params) => (
        <TextField
          {...params}
          required={required}
          size='small'
          label={label}
        />
      )}
    >
      {options.map((option) => (
        <option
          key={option.label}
          value={option.value}
        >
          {option.label}
        </option>
      ))}
    </Autocomplete>
  )
}

export default CustomAutocomplete
