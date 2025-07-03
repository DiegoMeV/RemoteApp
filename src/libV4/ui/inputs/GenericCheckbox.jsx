import { Checkbox, FormControlLabel } from '@mui/material'
import { forwardRef } from 'react'

const GenericCheckbox = forwardRef(function GenericCheckbox(
  { options, value, label, onChange, ...rest },
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
      control={
        <Checkbox
          checked={isChecked}
          onChange={handleChange}
          name='checkbox'
        />
      }
      label={label}
    />
  )
})

export default GenericCheckbox
