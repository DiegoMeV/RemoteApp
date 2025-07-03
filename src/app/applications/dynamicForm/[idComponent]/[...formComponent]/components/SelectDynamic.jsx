import { TextField, Autocomplete } from '@mui/material'
import { forwardRef } from 'react'

const SelectDynamic = forwardRef(function SelectDynamic(
  {
    selectItems,
    label,
    onChange,
    value,
    multiple,
    error,
    helperText,
    dataType,
    textFieldProps,
    ...rest
  },
  ref
) {
  const parsedItems =
    dataType === 'NUMBER'
      ? selectItems?.map((item) => ({ ...item, id: Number(item?.id) }))
      : selectItems

  const parseValue = (val) => (dataType === 'NUMBER' ? Number(val) : val)

  const selectedOption = multiple
    ? parsedItems?.filter((option) => value?.includes(parseValue(option?.id)))
    : parsedItems?.find((option) => parseValue(option?.id) === value) || null

  return (
    <Autocomplete
      {...rest}
      ref={ref}
      multiple={multiple}
      options={parsedItems}
      getOptionLabel={(option) => option?.label || ''}
      isOptionEqualToValue={(option, value) => option?.id === value?.id} // Comparación correcta
      value={selectedOption} // Asegurarse de que sea null o un objeto válido
      onChange={(_, newValue) => {
        onChange(multiple ? newValue?.map((item) => item.id) : newValue?.id || null)
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          {...textFieldProps}
          InputLabelProps={{ shrink: true }}
          label={label}
          error={error}
          helperText={helperText}
        />
      )}
    />
  )
})

export default SelectDynamic
