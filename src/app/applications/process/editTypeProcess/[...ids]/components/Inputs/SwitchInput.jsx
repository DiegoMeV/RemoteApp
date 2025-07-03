import { FormControlLabel, Switch } from '@mui/material'
import { Controller } from 'react-hook-form'

const SwitchInput = ({ item, control }) => {
  return (
    <Controller
      name={item.name}
      control={control}
      defaultValue={true}
      render={({ field }) => (
        <FormControlLabel
          {...field}
          control={<Switch checked={field?.value} />}
          label={item.label}
        />
      )}
    />
  )
}

export default SwitchInput
