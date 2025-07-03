import { Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { CustomAutocomplete } from '.'

const TimeInput = ({ timeLabel, value, onValueChange, onUnitChange, optionTypes }) => {
  const [localValue, setLocalValue] = useState(value?.value)

  const handleBlur = () => {
    onValueChange(localValue)
  }

  return (
    <>
      <Grid
        item
        xs={8}
      >
        <TextField
          fullWidth
          type='number'
          size='small'
          label={timeLabel}
          value={localValue}
          onChange={(event) => setLocalValue(event.target.value)}
          onBlur={handleBlur}
        />
      </Grid>
      <Grid
        item
        xs={4}
      >
        <CustomAutocomplete
          options={optionTypes}
          value={value?.type}
          onChange={(event, newValue) => onUnitChange(newValue)}
          label='Unidad de tiempo'
        />
      </Grid>
    </>
  )
}

export default TimeInput
