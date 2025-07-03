import { informaciónPersonal } from '../../../../const'
import { Autocomplete, FormControl, Grid, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

import { GenericDatePicker, toArray, useQueryDynamicApi } from '@/lib'
import dayjs from 'dayjs'

const InputsRowTwo = ({ form, handleDateChange, handleChangeSelect, errors }) => {
  const { data: labels } = useQueryDynamicApi({
    url: '/tipoReunionMesa',
    baseKey: 'urlCgr',
    isCompanyRequest: true,
  })

  const tipoMeet = {
    name: 'tipo_reunion',
    type: 'select',
    label: 'Tipo de reunión',
    required: true,
    options: toArray(
      labels?.data?.map((label) => {
        return { label: label?.nombre, value: label?.id }
      })
    ),
  }

  const rowTwo = [tipoMeet, ...informaciónPersonal.rowTwo]

  return (
    <>
      {rowTwo.map((input) => (
        <Grid
          item
          xs={4}
          key={input.name}
        >
          <Controller
            name={input.name}
            control={form.control}
            render={({ field }) => (
              <FormControl fullWidth>
                {input.type === 'select' && input.options ? (
                  <Autocomplete
                    {...field}
                    value={
                      field.value
                        ? input.options.find((option) => option.value === field.value)
                        : null
                    }
                    options={input.options}
                    size='small'
                    noOptionsText='No hay opciones disponibles'
                    labelId={`${input.name}-label`}
                    id={input.name}
                    label={input.label}
                    renderInput={(params) => (
                      <TextField
                        error={errors[input.name]}
                        helperText={errors[input.name] && 'Este campo es requerido'}
                        {...params}
                        label={input.label}
                        required={input.required ?? false}
                        InputLabelProps={{ shrink: true, ...params.InputLabelProps }}
                      />
                    )}
                    onChange={(_, newValue) => handleChangeSelect(input.name, newValue)}
                    sx={{ backgroundColor: 'backgroundWhite1' }}
                  />
                ) : (
                  <GenericDatePicker
                    textFieldProps={{
                      label: input.label,
                      InputLabelProps: { shrink: true },
                      error: errors[input.name],
                      helperText: errors[input.name] && 'Este campo es requerido',
                      required: input.required ?? false,
                      value: field?.value ? dayjs(field?.value) : null,
                    }}
                    datePickerProps={{
                      ...field,
                      onChange: (newValue) => handleDateChange(newValue, input.name),
                    }}
                  />
                )}
              </FormControl>
            )}
          />
        </Grid>
      ))}
    </>
  )
}

export default InputsRowTwo
