import { contractData } from '@/app/applications/uri/registryUri/const'
import { Autocomplete, FormControl, Grid, InputLabel, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowOne = ({ form, handleChangeSelect }) => {
  return (
    <>
      {contractData.rowOne.map((input) => (
        <Grid
          item
          xs={4}
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
                <FormControl fullWidth>
                  <InputLabel
                    shrink
                    id={`${input.name}-label`}
                  >
                    {input.label}
                  </InputLabel>
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
                    renderInput={(params) => <TextField {...params} />}
                    onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  ></Autocomplete>
                </FormControl>
              )
            }
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowOne
