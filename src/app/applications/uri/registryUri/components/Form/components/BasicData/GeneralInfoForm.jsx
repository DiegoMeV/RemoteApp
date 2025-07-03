import { inputsBasicData } from '@/app/applications/uri/registryUri/const'
import { Autocomplete, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const GeneralInfoForm = ({ form, handleChangeSelect, requiredInput }) => {
  return (
    <>
      {inputsBasicData.slice(0, 3).map((input) => (
        <Grid
          item
          xs={12}
          sm={4}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <>
                {input.type === 'select' ? (
                  <Autocomplete
                    {...field}
                    value={input.options?.find((option) => option.value === field.value) ?? null}
                    options={input.options}
                    size='small'
                    labelId={`${input.name}-label`}
                    id={input.name}
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
                ) : (
                  <TextField
                    {...field}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    error={requiredInput && input.name === 'sigedoc_inclusion'}
                    helperText={
                      requiredInput &&
                      input.name === 'sigedoc_inclusion' &&
                      'Este campo es requerido'
                    }
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

export default GeneralInfoForm
