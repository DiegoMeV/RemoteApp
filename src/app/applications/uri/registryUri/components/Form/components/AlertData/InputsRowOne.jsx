import { inputsAlertData } from '@/app/applications/uri/registryUri/const'
import { GenericDatePicker } from '@/lib'
import { Autocomplete, FormControl, Grid, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'

const InputsRowOne = ({ form, handleChangeSelect, handleDateChange }) => {
  return (
    <>
      {inputsAlertData.rowOne.map((input) => (
        <Grid
          item
          xs={3}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) =>
              input.type === 'date' ? (
                <GenericDatePicker
                  textFieldProps={{
                    label: input.label,
                    InputLabelProps: { shrink: true },
                  }}
                  datePickerProps={{
                    ...field,
                    onChange: (newValue) => handleDateChange(newValue, input.name),
                  }}
                  value={field.value}
                />
              ) : input.type === 'text' ? (
                <TextField
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  size='small'
                  label={input.label}
                  variant='outlined'
                  fullWidth
                  sx={{ backgroundColor: 'backgroundWhite1' }}
                />
              ) : (
                <FormControl fullWidth>
                  <Autocomplete
                    {...field}
                    value={
                      field.value
                        ? input.options.find((option) => option.value === field.value)
                        : null
                    }
                    options={input.options}
                    size='small'
                    labelId={`${input.name}-label`}
                    id={input.name}
                    label={input.label}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputLabelProps={{
                          shrink: true,
                        }}
                        label={input.label}
                      />
                    )}
                    onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  />
                </FormControl>
              )
            }
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowOne
