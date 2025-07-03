import { Grid, TextField } from '@mui/material'
import { GenericDatePicker } from '@/lib'
import { Controller } from 'react-hook-form'
import AutocompleteLOVSV from './AutocompleteLOVSV'
const CustomTextfieldSV = ({ elementAction, control }) => {
  const isTeaxtarea = elementAction?.variableType === 'textarea'
  return (
    <>
      {elementAction?.variableName === 'RESULTADOS_ACTUACION' ? (
        <></>
      ) : (
        <Grid
          item
          xs={12}
          sm={isTeaxtarea ? 12 : 6}
          md={isTeaxtarea ? 12 : 4}
        >
          <Controller
            name={elementAction?.id}
            control={control}
            rules={{ required: elementAction?.isRequired ? 'Este campo es requerido' : false }}
            render={({ field, fieldState: { error } }) => {
              const label = `${elementAction?.name} ${elementAction?.isRequired ? '*' : ''}`
              const helperText = error ? error.message : elementAction?.description ?? ''

              return (
                <>
                  {elementAction.variableType === 'date' ? (
                    <GenericDatePicker
                      textFieldProps={{
                        label: label,
                        helperText: helperText,
                        InputLabelProps: { shrink: true },
                        error: !!error,
                      }}
                      {...field}
                    />
                  ) : elementAction.variableType === 'lov' ? (
                    <AutocompleteLOVSV
                      elementAction={elementAction}
                      field={field}
                      error={error}
                    />
                  ) : (
                    <TextField
                      {...field}
                      size='small'
                      fullWidth
                      label={label}
                      error={!!error}
                      multiline={isTeaxtarea}
                      minRows={4}
                      helperText={helperText}
                      InputLabelProps={{ shrink: true }}
                      type={isTeaxtarea ? 'text' : elementAction?.variableType}
                    />
                  )}
                </>
              )
            }}
          />
        </Grid>
      )}
    </>
  )
}

export default CustomTextfieldSV
