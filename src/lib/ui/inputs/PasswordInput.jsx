import { Controller } from 'react-hook-form'
import { TextField, IconButton } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useState } from 'react'

const PasswordInput = ({
  form,
  label = 'Contraseña',
  name = 'password',
  helperText = '',
  validationRules = { required: 'La contraseña es obligatoria' },
} = {}) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={form.control}
      rules={validationRules}
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          variant='outlined'
          required
          fullWidth
          type={showPassword ? 'text' : 'password'}
          label={label}
          error={!!errors[name]}
          size='large'
          helperText={errors[name]?.message || helperText}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label='toggle password visibility'
                onClick={() => setShowPassword(!showPassword)}
                edge='end'
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            ),
          }}
        />
      )}
    />
  )
}

export default PasswordInput
