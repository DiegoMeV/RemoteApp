import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { actuacionesContrato } from '../../../../const'
import NumericFormatCustom from '@/lib/ui/inputs/NumericFormatCustom'

const InputsRowThree = ({ form, handleChangeNumber, errors }) => {
  return (
    <>
      {actuacionesContrato.rowThree.map((input) => (
        <Grid
          item
          xs={12}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
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
                      required={input.required ?? false}
                      fullWidth
                      multiline
                      rows={3}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                      InputProps={{ readOnly: input?.readOnly ?? false }}
                    />
                  )}
                  {input.type === 'peso' && (
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
                        readOnly: input?.readOnly ?? false
                      }}
                      onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                      type={input.type}
                      size='small'
                      label={input.label}
                      variant='outlined'
                      fullWidth
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

export default InputsRowThree
