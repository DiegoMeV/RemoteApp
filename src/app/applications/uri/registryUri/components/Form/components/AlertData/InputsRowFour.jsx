import { contractData } from '@/app/applications/uri/registryUri/const'
import { Autocomplete, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowFour = ({ form, handleChangeSelect }) => {
  return (
    <>
      {contractData.rowOne.map((input) => (
        <Grid
          item
          xs={6}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) =>
              input.type === 'text' ? (
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
              ) : (
                <Autocomplete
                  {...field}
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
              )
            }
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowFour
