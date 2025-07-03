import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'
import { actionComponents } from './GenericChooseInput'
import { specialCharacters } from '@/lib/funcs'

const GenericForm = ({ inputs, control }) => {
  return (
    <>
      {inputs?.map((item) => {
        const Input = actionComponents[item?.type] || actionComponents.default
        return (
          <Grid
            key={item?.name}
            item
            xs={item?.xs ?? 12}
            sm={item?.sm ?? 6}
            md={item?.space ?? 6}
          >
            {item?.type === 'button' ? (
              <Input {...item} />
            ) : (
              <Controller
                name={item?.name}
                control={control}
                rules={{
                  required: item?.required ? 'Este campo es requerido' : false,
                  validate:
                    item.type === 'text' || item.type === undefined
                      ? item?.validate ?? specialCharacters
                      : item?.validate ?? null,
                }}
                defaultValue={item?.defaultValue ?? null}
                render={({ field, fieldState: { error } }) => {
                  const { required, ...restItem } = item

                  const label = `${item?.label ?? item?.textFieldProps?.label ?? ''} ${
                    required ? '*' : ''
                  }`

                  const helperText = error
                    ? error.message
                    : item.helperText ?? item?.textFieldProps?.helperText ?? ''

                  const onChangeAutocomplete = (_, newValue) => field.onChange(newValue)

                  return (
                    <Input
                      {...field}
                      {...restItem}
                      onChange={
                        item.onChange
                          ? item.onChange
                          : item.type === 'autocomplete' || item.type === 'autocompleteRequest'
                          ? onChangeAutocomplete
                          : field.onChange
                      }
                      error={!!error}
                      label={label}
                      helperText={helperText}
                      textFieldProps={{
                        ...item?.textFieldProps,
                        label: label,
                        helperText: helperText,
                        error: !!error,
                      }}
                    />
                  )
                }}
              />
            )}
          </Grid>
        )
      })}
    </>
  )
}

export default GenericForm
