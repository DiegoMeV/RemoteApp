import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { contractData } from '@/app/applications/uri/registryUri/const'

const InputsRowOne = ({ form }) => {
  return (
    <>
      {contractData.rowTwo.map((input, index) => (
        <Grid
          item
          xs={index === 1 ? 8 : 4}
          key={input.name}
          md={12}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) =>
              input.type === 'text' && (
                <TextField
                  {...field}
                  InputLabelProps={{
                    shrink: true,
                  }}
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

export default InputsRowOne
