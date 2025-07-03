import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { actuacionesContrato } from '../../../../const'
import NumericFormatCustom from '@/lib/ui/inputs/NumericFormatCustom'

const InputsRowOne = ({ form, handleChangeNumber, errors }) => {
  return (
    <>
      {actuacionesContrato.rowTwo.map((input) => (
        <Grid
          item
          xs={4}
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
            render={({ field }) => {
              return (
                <>
                  {(input.type === 'text' || input.type === 'number') && (
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
                      fullWidth
                      required={input.required ?? false}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                      InputProps={{ readOnly: input?.readOnly ?? false }}
                    />
                  )}
                  {input.type === 'peso' && (
                    <TextField
                      error={errors[input.name]}
                      helperText={errors[input.name] && 'Este campo es requerido'}
                      {...field}
                      {...field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        readOnly: input?.readOnly ?? false,
                        inputComponent: NumericFormatCustom,
                        inputProps: {
                          thousandSeparator: true,
                          prefix: '$',
                        },
                        error: errors[input.name],
                        helperText: errors[input.name] && 'Este campo es requerido',
                      }}
                      onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                      type={input.type}
                      size='small'
                      label={input.label}
                      variant='outlined'
                      required={input.required ?? false}
                      fullWidth
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                    />
                  )}
                  {input.type === 'porcentaje' && (
                    <TextField
                      error={errors[input.name]}
                      helperText={errors[input.name] && 'Este campo es requerido'}
                      {...field}
                      {...field}
                      InputLabelProps={{
                        shrink: true,
                      }}
                      InputProps={{
                        endAdornment: '%',
                        readOnly: input?.readOnly ?? false
                      }}
                      inputProps={{ min: 1, max: 100 }}
                      onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                      type='number'
                      size='small'
                      label={input.label}
                      variant='outlined'
                      fullWidth
                      required={input.required ?? false}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                    />
                  )}
                </>
              )
            }}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowOne
