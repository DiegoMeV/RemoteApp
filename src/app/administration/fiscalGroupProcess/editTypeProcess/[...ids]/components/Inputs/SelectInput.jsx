import { MenuItem, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const SelectInput = ({ item, control }) => {
  return (
    <Controller
      name={item.name}
      control={control}
      defaultValue={item.options[0].value}
      render={({ field }) => (
        <TextField
          {...field}
          label={item.label}
          select
          fullWidth
          required
          value={field?.value}
          size='small'
          InputLabelProps={{ shrink: true }}
          sx={{ backgroundColor: 'backgroundWhite1' }}
        >
          {item.options.map((option) => (
            <MenuItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      )}
    />
  )
}

export default SelectInput
