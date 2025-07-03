import { basciData } from '../../../../const'
import { Autocomplete, FormControl, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { GenericDatePicker } from '@/lib'
import dayjs from 'dayjs'

const InputsRowOne = ({ form, handleDateChange, handleChangeSelect }) => {
  return (
    <>
      {basciData.rowOne.map((input) => (
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
                {input.type === 'select' && input.options ? (
                  <FormControl fullWidth>
                    <Autocomplete
                      {...field}
                      options={input.options}
                      size='small'
                      labelId={`${input.name}-label`}
                      id={input.name}
                      label={input.label}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label={input.label}
                          InputLabelProps={{ shrink: true, ...params.InputLabelProps }}
                        />
                      )}
                      onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                    />
                  </FormControl>
                ) : (
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
              </>
            )}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowOne
