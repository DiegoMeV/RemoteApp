import { Checkbox } from '@mui/material'

const ColumnCheckbox = ({ item }) => {
  const isChecked = item === true || item === 'S'
  return (
    <Checkbox
      disabled={true}
      checked={isChecked}
    />
  )
}

export default ColumnCheckbox
