import { Checkbox, FormControlLabel } from '@mui/material'

const GenericCheckBox = ({ ...props }) => {
  return (
    <FormControlLabel
      {...props}
      control={<Checkbox checked={props?.value} />}
    />
  )
}

export default GenericCheckBox
