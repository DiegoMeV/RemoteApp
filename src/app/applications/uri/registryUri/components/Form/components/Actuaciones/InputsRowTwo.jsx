import { actuaciones } from '@/app/applications/uri/registryUri/const'
import { GenericDatePicker } from '@/lib'
import { Autocomplete, FormControl, Grid, InputLabel, TextField } from '@mui/material'
import dayjs from 'dayjs'

import { Controller } from 'react-hook-form'

const InputsRowTwo = ({ form, handleChangeSelect, handleDateChange }) => {
  return (
    <>
      {actuaciones.rowTwo.map((input) => (
        <Grid
          item
          xs={4}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <>
                {input.type === 'select' && (
                  <FormControl fullWidth>
                    <InputLabel
                      shrink
                      id={`${input.name}-label`}
                    >
                      {input.label}
                    </InputLabel>
                    <Autocomplete
                      {...field}
                      options={input.options}
                      size='small'
                      labelId={`${input.name}-label`}
                      id={input.name}
                      label={input.label}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                    />
                  </FormControl>
                )}
                {input.type === 'date' && (
                  <GenericDatePicker
                    textFieldProps={{
                      label: input.label,
                      InputLabelProps: { shrink: true },
                    }}
                    datePickerProps={{
                      ...field,
                      value: field?.value ? dayjs(field?.value) : null,
                      onChange: (newValue) => handleDateChange(newValue, input.name),
                    }}
                  />
                )}
                {input.type === 'text' && (
                  <TextField
                    {...field}
                    InputLabelProps={{ shrink: true }}
                    size='small'
                    label={input.label}
                    variant='outlined'
                    fullWidth
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  />
                )}
              </>
            )}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowTwo
