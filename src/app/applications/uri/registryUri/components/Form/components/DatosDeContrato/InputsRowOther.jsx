import { contractData } from '@/app/applications/uri/registryUri/const'
import { GenericDatePicker } from '@/lib'
import { Grid } from '@mui/material'
import dayjs from 'dayjs'

import { Controller } from 'react-hook-form'

const InputsRowOther = ({ form, handleDateChange }) => {
  return (
    <>
      {contractData.other.map((input) => (
        <Grid
          item
          xs={3}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) =>
              input.type === 'date' && (
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
              )
            }
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowOther
