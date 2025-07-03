import { TextField } from '@mui/material'
import { useGridApiContext } from '@mui/x-data-grid-premium'
import { useLayoutEffect, useRef } from 'react'

const TextFieldEditingDG = (props) => {
  const { id, value, field, hasFocus, type, isMultiline } = props
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

  const propertiesMultiline = !isMultiline
    ? {}
    : {
        multiline: true,
        minRows: 2,
        maxRows: 2,
      }

  return (
    <TextField
      {...propertiesMultiline}
      ref={ref}
      value={value}
      type={type ?? 'text'}
      fullWidth
      onChange={handleValueChange}
    />
  )
}

export default TextFieldEditingDG
