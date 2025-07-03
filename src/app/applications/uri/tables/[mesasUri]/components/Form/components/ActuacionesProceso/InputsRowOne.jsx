import { Autocomplete, FormControl, Grid, InputLabel, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'
import { actuacionesProceso } from '../../../../const'
import { GenericDatePicker } from '@/lib'

const InputsRowOne = ({ form, handleChangeSelect, handleChangeNumber, handleDateChange }) => {
  return (
    <>
      {actuacionesProceso.rowOne.map((input) => (
        <Grid
          item
          xs={5}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <>
                {(input.type === 'text' || input.type === 'number') && (
                  <TextField
                    {...field}
                    type={input.type}
                    InputLabelProps={{ shrink: true }}
                    size='small'
                    label={input.label}
                    variant='outlined'
                    onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                    fullWidth
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  />
                )}

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
                    value={field?.value}
                    textFieldProps={{
                      label: input.label,
                      InputLabelProps: { shrink: true },
                    }}
                    datePickerProps={{
                      ...field,
                      onChange: (newValue) => {
                        handleDateChange(newValue, input.name)
                      },
                    }}
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

export default InputsRowOne
