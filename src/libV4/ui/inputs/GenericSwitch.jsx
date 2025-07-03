import { FormControlLabel, Switch } from '@mui/material'
import { forwardRef } from 'react'

const GenericSwitch = forwardRef(function GenericSwitch(
  { options, formcontrolprops, switchprops, onChange, value, ...rest },
  ref
) {
  const trueValue = options?.[0]?.value ?? true
  const falseValue = options?.[1]?.value ?? false

  const handleChange = (event) => {
    const newValue = event.target.checked ? trueValue : falseValue
    onChange(newValue)
  }
  const isChecked = trueValue === value
  return (
    <FormControlLabel
      ref={ref}
      {...rest}
      {...formcontrolprops}
      checked={isChecked}
      onChange={handleChange}
      control={<Switch {...switchprops} />}
    />
  )
})

GenericSwitch.displayName = 'GenericSwitch'

export default GenericSwitch
