import { Switch } from '@mui/material'
import { useGridApiContext } from '@mui/x-data-grid-premium'
import { useLayoutEffect, useRef } from 'react'

const CustomSwitchEditingDG = (props) => {
  const { id, field, value, hasFocus } = props
  const apiRef = useGridApiContext()
  const ref = useRef()

  useLayoutEffect(() => {
    if (hasFocus) {
      ref.current.focus()
    }
  }, [hasFocus])

  const handleValueChange = (event) => {
    const newValue = event.target.checked ? 'S' : 'N'
    apiRef.current.setEditCellValue({ id, field, value: newValue })
  }

  return (
    <Switch
      ref={ref}
      defaultChecked={value === 'N' ? false : true}
      onChange={handleValueChange}
    />
  )
}

export default CustomSwitchEditingDG
