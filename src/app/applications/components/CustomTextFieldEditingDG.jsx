import { TextField } from '@mui/material'
import { useGridApiContext } from '@mui/x-data-grid-premium'
import { useLayoutEffect, useRef } from 'react'

const CustomTextFieldEditingDG = (props) => {
  const { id, value, field, hasFocus, type } = props
  const apiRef = useGridApiContext()
  const ref = useRef()

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current.focus()
    }
  }, [hasFocus])

  const handleValueChange = (event) => {
    const newValue = event.target.value // The new value entered by the user
    apiRef.current.setEditCellValue({ id, field, value: newValue })
  }

  return (
    <TextField
      ref={ref}
      value={value}
      type={type ?? 'text'}
      fullWidth
      onChange={handleValueChange}
    />
  )
}

export default CustomTextFieldEditingDG
