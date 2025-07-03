import { Checkbox, FormControlLabel } from '@mui/material'

const CheckboxLabels = ({ onChange, label, value, options, title }) => {
  const trueValue = options?.[0]?.id ?? true
  const falseValue = options?.[1]?.id ?? false

  const isChecked = trueValue === value

  const handleChange = (event) => {
    const newValue = event.target.checked ? trueValue : falseValue
    onChange(newValue)
  }

  return (
    <FormControlLabel
      title={title ?? null}
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
}

export default CheckboxLabels
