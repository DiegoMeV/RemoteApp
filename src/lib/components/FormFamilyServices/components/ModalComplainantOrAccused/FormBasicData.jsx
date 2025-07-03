import { actionComponents } from '@/lib/ui'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

const FormComplainantOrAccused = ({ basicData, formModal }) => {
  return (
    <Grid
      container
      spacing={2}
      alignContent='flex-start'
    >
      {basicData?.map((item, index) => {
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
              }}
              defaultValue={item?.defaultValue ?? null}
              render={({ field, fieldState: { error, invalid } }) => {
                const { required, ...restItem } = item
                const label = `${item?.label} ${required ? '*' : ''}`
                const helperText = error ? error.message : item.helperText ?? ''
                return (
                  <Input
                    {...field}
                    {...restItem}
                    error={!!error || invalid}
                    label={label}
                    helperText={helperText}
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

export default FormComplainantOrAccused
