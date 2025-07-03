import { inputsAlertData } from '@/app/applications/uri/registryUri/const'
import { Grid, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'

const InputsRowOther = ({ form, handleChangeNumber }) => {
  return (
    <>
      {inputsAlertData.other.map((input) => (
        <Grid
          item
          xs={12}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) =>
              (input.type === 'text' || input.type === 'number') && (
                <TextField
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

export default InputsRowOther
