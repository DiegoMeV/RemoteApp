import { Autocomplete, Grid, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const AutocompleteTypeProcess = ({ control, processTypes, setValue, currentValues, md }) => {
  const [processInput, setProcessInput] = useState(currentValues?.processType ?? null)

  const handleChange = (event, newValue) => {
    setValue('processType', newValue)
    setProcessInput(newValue)
  }

  return (
    <Grid
      item
      xs={12}
      md={md ?? 6}
      pt={3}
      px={2}
    >
      <Controller
        control={control}
        name='processType'
        render={({ field }) => (
          <Autocomplete
            {...field}
            fullWidth
            value={processInput}
            onChange={handleChange}
            options={processTypes?.data ?? []}
            getOptionLabel={(option) => option?.name}
            isOptionEqualToValue={(option, value) => option?.id === value?.id}
            renderInput={(params) => (
              <TextField
                {...params}
                size={'small'}
                label='Seleccione un tipo de proceso'
                required={true}
              />
            )}
          />
        )}
      />
    </Grid>
  )
}

export default AutocompleteTypeProcess
