import { FormControlLabel, Switch } from '@mui/material'

const GenericSwitch = ({ formControlProps, switchProps, ...rest }) => {
  return (
    <FormControlLabel
      {...rest}
      {...formControlProps}
      defaultChecked={rest?.value ?? ''}
      checked={rest?.value ?? ''}
      control={<Switch {...switchProps} />}
    />
  )
}

export default GenericSwitch
