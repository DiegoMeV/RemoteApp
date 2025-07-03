import { Autocomplete, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { actuacionesContrato } from '../../../../const'
import NumericFormatCustom from '@/lib/ui/inputs/NumericFormatCustom'

const InputsRowOne = ({ form, handleChangeSelect, handleChangeNumber, errors }) => {
  return (
    <>
      {actuacionesContrato.rowOne.map((input) => (
        <Grid
          item
          xs={6}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) =>
              input.type === 'text' || input.type === 'number' ? (
                <TextField
                  error={errors[input.name]}
                  helperText={errors[input.name] && 'Este campo es requerido'}
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                  type={input.type}
                  size='small'
                  label={input.label}
                  variant='outlined'
                  required={input.required ?? false}
                  fullWidth
                  sx={{ backgroundColor: 'backgroundWhite1' }}
                  InputProps={{ readOnly: input?.readOnly ?? false }}
                />
              ) : input.type === 'peso' ? (
                <TextField
                  error={errors[input.name]}
                  helperText={errors[input.name] && 'Este campo es requerido'}
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    inputComponent: NumericFormatCustom,
                    inputProps: {
                      thousandSeparator: true,
                      prefix: '$',
                    },
                    readOnly: input?.readOnly ?? false,
                  }}
                  onChange={(e) => {
                    return handleChangeNumber(e.target.value, input.name, input.type)
                  }}
                  type={input.type}
                  size='small'
                  label={input.label}
                  variant='outlined'
                  required={input.required ?? false}
                  fullWidth
                  sx={{ backgroundColor: 'backgroundWhite1' }}
                />
              ) : (
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
                      error={errors[input.name]}
                      helperText={errors[input.name] && 'Este campo es requerido'}
                      {...params}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      required={input.required ?? false}
                      label={input.label}
                    />
                  )}
                  onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                  sx={{ backgroundColor: 'backgroundWhite1' }}
                />
              )
            }
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowOne
