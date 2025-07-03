import { actionComponents, toBoolean } from '@/lib'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'

const InputsSelector = ({ inputs, control }) => {
  return (
    <>
      {inputs?.map((item) => {
        const Input = actionComponents[item?.tipo] || actionComponents.default
        return (
          <Grid
            key={item?.name}
            item
            xs={12}
          >
            <Controller
              name={item?.nombre}
              control={control}
              rules={{ required: toBoolean(item.required) ? 'Este campo es requerido' : false }}
              defaultValue={item?.defaultValue ?? null}
              render={({ field, fieldState: { error } }) => {
                const { required, ...restItem } = item
                const helperText = error ? error.message : item.helperText ?? ''
                const onChangeAutocomplete = (_, newValue) => field.onChange(newValue)
                return (
                  <Input
                    {...field}
                    {...restItem}
                    error={!!error}
                    label={`${item.titulo} ${toBoolean(required) ? '*' : ''}`}
                    helperText={helperText}
                    type={item.tipo}
                    minRows={item.tipo === 'multiline' ? 3 : undefined}
                    maxRows={5}
                    onChange={item.tipo === 'autocomplete' ? onChangeAutocomplete : field.onChange}
                  />
                )
              }}
            />
          </Grid>
        )
      })}
    </>
  )
}

export default InputsSelector
