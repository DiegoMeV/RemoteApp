import { GenericSwitch } from '@/lib'

const SwitchDynamic = ({ label, value, error, helperText, onChange, disabled }) => {
  return (
    <GenericSwitch
      formControlProps={{ label: label, error: error, helperText: helperText }}
      switchProps={{ onChange: onChange, checked: value, disabled: disabled }}
    />
  )
}

export default SwitchDynamic
