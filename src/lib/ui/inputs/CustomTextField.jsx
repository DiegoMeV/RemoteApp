import { specialCharacters } from '@/lib/funcs'
import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'

const CustomTextField = ({ item, control }) => {
  return (
    <Controller
      name={item?.name}
      control={control}
      rules={{
        required: item?.required ? item?.errorMsj ?? 'Este campo es requerido' : false,
        validate: item?.validate
          ? item?.validate
          : item?.type === 'text'
          ? specialCharacters
          : null,
      }}
      render={({ field, fieldState: { error } }) => {
        const newHelperText =
          error?.type === 'validate' || error?.type === 'required'
            ? error?.message ?? ''
            : item.helperText ??
              (error ? (error?.message ? item?.errorMsj ?? '' : item?.error?.message) : '')

        let newLabel = `${item?.label ?? ''} ${item?.required ? '*' : ''}`.trim()
        if (!newLabel) {
          newLabel = undefined
        }
        return (
          <TextField
            {...field}
            value={item?.value ?? field?.value?.nombre ?? field?.value ?? ''}
            fullWidth
            size='small'
            onPaste={(e) => {
              item.noPaste ? e.preventDefault() : null
            }}
            label={newLabel}
            placeholder={item?.placeholder ?? ''}
            type={item?.type ?? 'text'}
            error={!!error}
            helperText={newHelperText}
            disabled={item?.disabled ?? false}
            multiline={item?.type === 'multiline'}
            autoComplete={item?.autoComplete ?? null}
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
            minRows={item?.minRows ? item?.minRows : 3}
            onBlur={item?.onBlur ?? null}
            InputLabelProps={
              item?.type === 'date'
                ? { shrink: true }
                : item?.shrink
                ? { shrink: item?.shrink }
                : {}
            }
            inputProps={{ readOnly: item?.readOnly ?? false }}
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
