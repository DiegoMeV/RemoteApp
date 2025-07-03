import { Grid, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'
import { actuacionesFuncionario } from '../../../../const'

const InputsRowOne = ({ form, handleChangeNumber }) => {
  return (
    <>
      {actuacionesFuncionario.rowOne.map((input) => (
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
                {(input.type === 'text' || input.type === 'number') && (
                  <TextField
                    {...field}
                    onChange={(e) => handleChangeNumber(e.target.value, input.name, input.type)}
                    type={input.type}
                    InputLabelProps={{ shrink: true }}
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

export default InputsRowOne
