import { TextField } from '@mui/material'
import { Controller } from 'react-hook-form'
import stylesTextFieldGeneralInfo from '../../styles/stylesSx'

const CustomTextField = ({ item, control }) => {
  return (
    <Controller
      name={item.name}
      control={control}
      render={({ field }) => (
        <TextField
          {...field}
          label={item.label}
          fullWidth
          required={item.required ?? false}
          size='small'
          type={item.type}
          multiline={item.type === 'multiline'}
          minRows={3}
          helperText={item.helperText ?? ''}
          InputLabelProps={{ shrink: true }}
          sx={stylesTextFieldGeneralInfo}
        />
      )}
    />
  )
}

export default CustomTextField
