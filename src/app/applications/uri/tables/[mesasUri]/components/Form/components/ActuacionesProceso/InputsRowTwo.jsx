import { Autocomplete, FormControl, Grid, InputLabel, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'
import { actuacionesProceso } from '../../../../const'

import { GenericDatePicker } from '@/lib'
const InputsRowTwo = ({
  form,
  handleChangeSelect,
  handleDateChange,
  handleChangeNumber,
  errors,
}) => {
  return (
    <>
      {actuacionesProceso.rowTwo.map((input) => (
        <Grid
          item
          xs={12}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            rules={{
              validate: {
                limit: (value) => {
                  if (input.type === 'porcentaje') {
                    return +value > 100 ? 'El valor no debe pasar de 100%' : true
                  }
                },
              },
            }}
            render={({ field }) => (
              <>
                {(input.type === 'text' || input.type === 'number') && (
                  <TextField
                    error={errors[input.name]}
                    helperText={errors[input.name] && 'Este campo es requerido'}
                    {...field}
                    type={input.type}
                    InputLabelProps={{ shrink: true }}
                    onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                    size='small'
                    label={input.label}
                    variant='outlined'
                    fullWidth
                    required={input.required ?? false}
                    multiline
                    rows={3}
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
                      error={errors[input.name]}
                      helperText={errors[input.name] && 'Este campo es requerido'}
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
                      onChange: (newValue) => handleDateChange(newValue, input.name),
                    }}
                    {...field}
                  />
                )}
                {input.type === 'porcentaje' && (
                  <TextField
                    error={errors[input.name]}
                    helperText={errors[input.name] && 'Este campo es requerido'}
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    InputProps={{
                      endAdornment: '%',
                    }}
                    inputProps={{ min: 1, max: 100 }}
                    onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                    type='number'
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
