import { basciData } from '../../../../const'
import { Autocomplete, FormControl, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { GenericDatePicker } from '@/lib'
import dayjs from 'dayjs'

const InputsRowThree = ({ form, handleDateChange, handleChangeNumber, handleChangeSelect }) => {
  return (
    <>
      {basciData.rowThree.map((input) => (
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
                {input.type === 'text' || input.type === 'number' ? (
                  <TextField
                    {...field}
                    label={input.label}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    type={input.type}
                    onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                    size='small'
                    variant='outlined'
                    fullWidth
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  />
                ) : input.type === 'date' ? (
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
                ) : (
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
                )}
              </>
            )}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowThree
