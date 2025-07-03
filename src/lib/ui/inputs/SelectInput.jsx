import { MenuItem, TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const SelectInput = ({ item, control }) => {
  return (
    <Controller
      name={item.name}
      control={control}
      defaultValue={item?.noDefaultValue ? null : item?.options?.[0]?.value ?? null}
      rules={{
        required: item?.required ? 'Este campo es requerido' : false,
        validate: item?.validate ?? null,
      }}
      render={({ field, fieldState: { error } }) => {
        const newHelperText = error ? error?.message : item?.helperText ?? ''
        const newLabel = `${item?.label ?? ''} ${item?.required ? '*' : ''}`
        return (
          <TextField
            {...field}
            label={newLabel}
            select
            fullWidth
            value={field?.value ? field.value : item?.multiple ? [] : ''}
            error={!!error}
            disabled={item?.disabled ?? false}
            size='small'
            InputLabelProps={{ shrink: true }}
            InputProps={{ readOnly: item?.readOnly ?? false }}
            inputProps={{ multiple: item?.multiple ?? false }}
            helperText={newHelperText}
            onBlur={item?.onBlur ?? null}
            onChange={(e) => {
              field.onChange(e.target.value)
              item?.onChange?.(e.target.value)
            }}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'backgroundWhite1',
              },
            }}
          >
            {item?.options?.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
              >
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        )
      }}
    />
  )
}

export default SelectInput
