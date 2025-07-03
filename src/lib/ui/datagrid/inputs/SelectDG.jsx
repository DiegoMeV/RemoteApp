import { MenuItem, TextField } from '@mui/material'
import { useGridApiContext } from '@mui/x-data-grid-premium'
import { useLayoutEffect, useRef } from 'react'

const SelectDG = (props) => {
  const { id, value, options, field, hasFocus } = props
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
      defaultValue={options?.[0]?.value ?? null}
      value={value}
      select
      fullWidth
      size='small'
      onChange={handleValueChange}
    >
      {options?.map((option) => (
        <MenuItem
          key={option?.value ?? ''}
          value={option?.value ?? ''}
        >
          {option?.label ?? ''}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default SelectDG
