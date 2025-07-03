import { inputsAlertData } from '@/app/applications/uri/registryUri/const'
import NumericFormatCustom from '@/lib/ui/inputs/NumericFormatCustom'
import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowThree = ({ form, handleChangeNumber }) => {
  return (
    <>
      {inputsAlertData.rowThree.map((input) => (
        <Grid
          item
          xs={input.type === 'porcentaje' ? 4 : 6}
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
            render={({ field, fieldState: { error } }) =>
              input.type === 'porcentaje' ? (
                <TextField
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  InputProps={{
                    endAdornment: '%',
                  }}
                  error={!!error}
                  helperText={error ? error.message : null}
                  inputProps={{ min: 1, max: 100 }}
                  onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                  type='number'
                  size='small'
                  label={input.label}
                  variant='outlined'
                  fullWidth
                  sx={{ backgroundColor: 'backgroundWhite1' }}
                />
              ) : (
                <TextField
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
                  }}
                  onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                  type={input.type}
                  size='small'
                  label={input.label}
                  disabled={input.disabled}
                  variant='outlined'
                  fullWidth
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

export default InputsRowThree
