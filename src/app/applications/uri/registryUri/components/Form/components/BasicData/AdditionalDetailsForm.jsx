import { inputsBasicData } from '@/app/applications/uri/registryUri/const'
import { Autocomplete, FormControl, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { GenericDatePicker } from '@/lib'
const AdditionalDetailsForm = ({ form, handleDateChange, handleChangeSelect, requiredInput }) => {
  return (
    <Grid
      item
      xs={12}
      container
      spacing={2}
    >
      {inputsBasicData.slice(3).map((input) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={6}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <FormControl fullWidth>
                {input.type === 'select' && input.options ? (
                  <Autocomplete
                    {...field}
                    value={
                      input.name === 'intervencion_funcional_oficio'
                        ? field.value
                          ? 'SI'
                          : 'NO'
                        : field.value
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
                ) : input.type === 'text' ? (
                  <TextField
                    {...field}
                    label={input.label}
                    InputLabelProps={{
                      shrink: true,
                    }}
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
                      error:
                        input.name === 'fecha_inicial_apertura_actuacion' ? !!requiredInput : false,
                      helperText: requiredInput && 'Este campo es requerido',
                    }}
                    datePickerProps={{
                      ...field,
                      onChange: (newValue) => handleDateChange(newValue, input.name),
                    }}
                    value={field.value}
                  />
                )}
              </FormControl>
            )}
          />
        </Grid>
      ))}
    </Grid>
  )
}

export default AdditionalDetailsForm
