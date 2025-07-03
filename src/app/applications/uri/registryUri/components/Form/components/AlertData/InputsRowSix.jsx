import { contractData } from '@/app/applications/uri/registryUri/const'
import { Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowSix = ({ form }) => {
  return (
    <>
      {contractData.rowThree.map((input) => (
        <Grid
          item
          xs={12}
          key={input.name}
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
                  multiline
                  minRows={3}
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

export default InputsRowSix
