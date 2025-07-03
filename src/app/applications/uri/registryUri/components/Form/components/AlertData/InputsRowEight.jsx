import { contractData } from '@/app/applications/uri/registryUri/const'
import { GenericDatePicker, useListRegionsInfo } from '@/lib'
import { Autocomplete, Grid, TextField } from '@mui/material'

import { Controller } from 'react-hook-form'

const InputsRowEight = ({ form, handleDateChange, handleChangeSelect }) => {
  const { data: region, isLoading: loadingRegion } = useListRegionsInfo()
  const optionsRegion = region?.data?.map((region) => ({
    value: region?.id,
    label: region?.nombre,
  }))

  return (
    <>
      {contractData.other.map((input) => (
        <Grid
          item
          xs={4}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => {
              return (
                <>
                  {input.type === 'date' && (
                    <GenericDatePicker
                      textFieldProps={{
                        label: input.label,
                        InputLabelProps: { shrink: true },
                      }}
                      datePickerProps={{
                        ...field,
                        onChange: (newValue) => handleDateChange(newValue, input.name),
                      }}
                      value={field.value}
                    />
                  )}
                  {input.type === 'select' && input.name === 'id_region_alertada' && (
                    <Autocomplete
                      {...field}
                      disabled={loadingRegion}
                      options={region ? optionsRegion : []}
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
                      onChange={(_, newValue) => {
                        handleChangeSelect(input.name, newValue)
                      }}
                      sx={{ backgroundColor: 'backgroundWhite1' }}
                    />
                  )}
                  {input.type === 'select' && input.name !== 'id_region_alertada' && (
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
                      onChange={(_, newValue) => {
                        handleChangeSelect(input.name, newValue)
                      }}
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

export default InputsRowEight
