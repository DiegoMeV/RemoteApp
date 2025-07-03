import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import { ClassicIconButton } from '../buttons'
import { Search } from '@mui/icons-material'

const requestSuccess = {
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'green',
    },
    '&:hover fieldset': {
      borderColor: 'darkgreen',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'limegreen',
    },
  },
  '& .MuiInputLabel-root': {
    color: 'green',
  },
  '& .MuiInputBase-input': {
    color: 'green',
  },
}

const SearchTextField = ({ item, control }) => {
  const successColor = item?.success ? requestSuccess : {}

  return (
    <Controller
      name={item?.name}
      control={control}
      rules={{
        required: item?.required ? item?.errorMsj ?? 'Este campo es requerido' : false,
        validate: item?.validate ?? null,
      }}
      render={({ field, fieldState: { error = item.error?.status } }) => {
        const newHelperText =
          error?.type === 'validate'
            ? error?.message ?? ''
            : item.helperText ??
              (error ? (error?.message ? item?.errorMsj ?? '' : item?.error?.message) : '')
        const newLabel = `${item?.label ?? ''} ${item?.required ? '*' : ''}`
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
            disabled={(item?.isLoading || item?.disabled) ?? false}
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
            InputProps={{
              startAdornment: (
                <ClassicIconButton
                  title='Buscar'
                  disabled={item?.isLoading || item?.disabledBtn}
                  onClick={(ev) => item?.onClickSearchBtn(ev)}
                  sx={{
                    height: '25px',
                    width: '25px',
                  }}
                >
                  <Search />
                </ClassicIconButton>
              ),
            }}
            sx={{
              '& .MuiInputBase-root': {
                backgroundColor: 'backgroundWhite1',
              },
              ...item.sx,
              ...successColor,
            }}
          />
        )
      }}
    />
  )
}

export default SearchTextField
