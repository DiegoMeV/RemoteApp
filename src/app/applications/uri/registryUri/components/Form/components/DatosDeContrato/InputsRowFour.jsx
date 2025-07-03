import { contractData } from '@/app/applications/uri/registryUri/const'
import { Autocomplete, FormControl, Grid, InputLabel, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsRowFour = ({ form, handleChangeSelect }) => {
  return (
    <>
      {contractData.rowFour.map((input, index) => (
        <Grid
          item
          xs={index < 2 ? 3 : 6}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <>
                {input.type === 'text' ? (
                  <TextField
                    {...field}
                    InputLabelProps={{ shrink: true }}
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
                      options={input.options}
                      size='small'
                      labelId={`${input.name}-label`}
                      id={input.name}
                      label={input.label}
                      renderInput={(params) => <TextField {...params} />}
                      onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                    />
                  </FormControl>
                )}
              </>
            )}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowFour
