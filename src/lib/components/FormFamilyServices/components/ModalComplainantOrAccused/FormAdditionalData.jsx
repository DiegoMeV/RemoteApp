import { actionComponents } from '@/lib/ui'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

const FormAdditionalData = ({ additionalDataActor, formModal }) => {
  return (
    <Grid
      container
      spacing={2}
      alignContent='flex-start'
    >
      {additionalDataActor?.map((item, index) => {
        const Input = actionComponents[item?.type] || actionComponents.default
        return (
          <Grid
            key={index}
            item
            xs={12}
            sm={6}
            md={item?.space ?? 6}
          >
            <Controller
              name={item?.name}
              control={formModal.control}
              rules={{
                required: item?.required ? 'Este campo es requerido' : false,
                validate: item?.validate,
              }}
              defaultValue={item?.defaultValue ?? null}
              render={({ field, fieldState: { error } }) => {
                const { required, ...restItem } = item
                const label = `${item?.label ?? item?.textFieldProps?.label ?? ''} ${
                  required ? '*' : ''
                }`
                const helperText = error ? error.message : item.helperText ?? ''
                return (
                  <Input
                    {...field}
                    {...restItem}
                    error={!!error}
                    label={label}
                    helperText={helperText}
                    textFieldProps={{
                      helperText,
                      label,
                      error: !!error,
                      ...item?.textFieldProps,
                    }}
                  />
                )
              }}
            />
          </Grid>
        )
      })}
    </Grid>
  )
}

export default FormAdditionalData
