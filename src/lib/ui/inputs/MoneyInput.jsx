import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import NumericFormatCustom from './NumericFormatCustom'

const CustomTextField = ({ item, control }) => {
  return (
    <Controller
      name={item?.name}
      control={control}
      rules={{ required: item?.required ? 'Este campo es requerido' : false }}
      render={({ field, fieldState: { error } }) => {
        const newHelperText = error ? error.message : item?.helperText ?? ''
        const newLabel = `${item?.label ?? ''} ${item?.required ? '*' : ''}`
        return (
          <TextField
            {...field}
            size='small'
            fullWidth
            label={newLabel}
            placeholder={item?.placeholder ?? ''}
            helperText={newHelperText}
            error={!!error}
            disabled={item?.disabled ?? false}
            InputProps={{
              inputComponent: NumericFormatCustom,
              inputProps: {
                thousandSeparator: true,
                prefix: '$ ',
                readOnly: item?.readOnly ?? false,
              },
            }}
            onChange={
              item?.onChange
                ? (e) => {
                    field.onChange(e)
                    item.onChange(e.target.value)
                  }
                : (e) => {
                    field.onChange(e)
                  }
            }
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'backgroundWhite1',
              },
              ...item.sx,
            }}
          />
        )
      }}
    />
  )
}

export default CustomTextField
