import { FormControlLabel, Switch } from '@mui/material'
import { Controller } from 'react-hook-form'

const SwitchInput = ({ item, control }) => {
  return (
    <Controller
      name={item.name}
      control={control}
      defaultValue={item?.defaultValue ?? true}
      render={({ field }) => {
        const state = field?.value ? 'Activo' : 'Inactivo'
        return (
          <FormControlLabel
            {...field}
            checked={field?.value}
            onChange={(e) => {
              field?.onChange(e.target.checked)
              item?.onChange?.(e.target.checked)
            }}
            control={
              <Switch
                checked={field?.value}
                disabled={item.disabled ?? false}
              />
            }
            label={field.name === 'activo' || field.name.includes('isEnabled') ? state : item.label}
          />
        )
      }}
    />
  )
}

export default SwitchInput
