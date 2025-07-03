import { Checkbox, FormControlLabel } from '@mui/material'
import { Controller } from 'react-hook-form'

const CheckboxInput = ({ item, control }) => {
  return (
    <Controller
      name={item.name}
      control={control}
      defaultValue={item?.defaultValue ?? true}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          onChange={(e) => {
            field?.onChange(e.target.checked)
            item?.onChange?.(e.target.checked)
          }}
          control={<Checkbox checked={field?.value} />}
          label={item.label}
        />
      )}
    />
  )
}

export default CheckboxInput
