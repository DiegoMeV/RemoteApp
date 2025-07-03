import { ValueListGlobal, actionComponents } from '@/lib'
import { Grid } from '@mui/material'
import { Controller } from 'react-hook-form'
import { AutocompleteSigners } from '../Inputs'

const FixedInputs = ({
  inputs,
  control,
  setValue,
  initialVariables,
  modalOptions,
  defaultSigners,
}) => {
  const selectedOption = ({ row }) => {
    setValue(modalOptions?.name, row)
  }
  return (
    <>
      {inputs?.map((item) => {
        const Input = actionComponents[item?.type] || actionComponents.default
        return (
          <Grid
            key={item?.name}
            item
            xs={12}
            sm={6}
            md={item?.space ?? 6}
          >
            <Controller
              name={item?.name}
              control={control}
              rules={{ required: item?.required ? 'Este campo es requerido' : false }}
              defaultValue={item?.defaultValue ?? null}
              render={({ field, fieldState: { error } }) => {
                const { required, ...restItem } = item
                const label = `${item?.label} ${required ? '*' : ''}`
                const helperText = error ? error.message : item.helperText ?? ''
                const onChangeAutocomplete = (_, newValue) => field.onChange(newValue)
                return (
                  <Input
                    {...field}
                    {...restItem}
                    error={!!error}
                    label={label}
                    helperText={helperText}
                    multiline={item.tipo === 'string'}
                    minRows={item.tipo === 'string' ? 3 : undefined}
                    onChange={item.type === 'autocomplete' ? onChangeAutocomplete : field.onChange}
                  />
                )
              }}
            />
          </Grid>
        )
      })}
      <AutocompleteSigners
        control={control}
        setValue={setValue}
        firmantes={initialVariables?.data?.[0].especificaciones?.data?.firmantes}
        defaultSigners={defaultSigners}
      />
      <ValueListGlobal
        {...modalOptions}
        selectedOption={selectedOption}
      />
    </>
  )
}

export default FixedInputs
