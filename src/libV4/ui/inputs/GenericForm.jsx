import { Controller } from 'react-hook-form'
import { actionComponents } from './GenericChooseInput'
import { Button } from '@mui/material'

const autocompleteTypes = ['autocomplete', 'autocompleteRequest', 'autocompleteQuery']

const GenericForm = ({ inputs, control, form }) => {
  return inputs?.map?.((item) => {
    if (item?.type === 'section') {
      const SectionComponent = (
        <div
          key={item?.name}
          className={item?.className}
          {...(item?.divProps || {})}
        >
          {item?.title && (
            <h2 className={item?.titleProps ?? 'text-lg font-bold mb-4'}>{item.title}</h2>
          )}
          <GenericForm
            inputs={item.children}
            control={control}
            form={form}
          />
        </div>
      )
      return SectionComponent
    }
    const Input = actionComponents[item?.type] || actionComponents.default

    const divProps = item?.divProps ?? {}
    return (
      <div
        key={item?.name}
        {...divProps}
        className={item?.className}
      >
        {item?.type === 'button' ? (
          <Button
            variant='contained'
            fullWidth
            {...item}
          />
        ) : (
          <Controller
            name={item?.name}
            control={control}
            rules={{
              required: item?.required ? 'Este campo es requerido' : false,
              validate: item?.validate ?? null,
            }}
            defaultValue={item?.defaultValue ?? null}
            render={({ field, fieldState: { error } }) => {
              const { required, ...restItem } = item

              const label = `${item?.label ?? item?.textfieldprops?.label ?? ''} ${
                required ? '*' : ''
              }`
              const helperText = error
                ? error.message
                : item?.helperText ?? item?.textfieldprops?.helperText ?? ''
              const onChangeAutocomplete = (_, newValue) => {
                if (item?.onChange) {
                  item?.onChange(newValue)
                  return
                }
                field.onChange(newValue)
              }

              return (
                <Input
                  {...field}
                  onChange={
                    autocompleteTypes?.includes(item.type) ? onChangeAutocomplete : field.onChange
                  }
                  {...restItem}
                  error={error ? error?.message : null}
                  label={label}
                  helperText={helperText}
                  textfieldprops={{
                    label: label,
                    helperText: helperText,
                    error: !!error,
                    ...item?.textfieldprops,
                  }}
                />
              )
            }}
          />
        )}
      </div>
    )
  })
}

export default GenericForm
