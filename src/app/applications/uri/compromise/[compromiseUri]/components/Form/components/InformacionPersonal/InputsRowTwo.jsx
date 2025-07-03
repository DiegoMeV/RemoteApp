import { basciData } from '../../../../const'
import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { GenericDatePicker } from '@/lib'
import dayjs from 'dayjs'

const InputsRowTwo = ({ form, handleDateChange, handleChangeNumber }) => {
  return (
    <>
      {basciData.rowTwo.map((input) => (
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

export default InputsRowTwo
