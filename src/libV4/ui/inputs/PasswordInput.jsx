import { Visibility, VisibilityOff } from '@mui/icons-material'
import { IconButton, TextField } from '@mui/material'
import { useState } from 'react'
import { Controller } from 'react-hook-form'

const PasswordInput = ({ form, name = 'password' }) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <Controller
      name={name}
      control={form.control}
      render={({ field, formState: { errors } }) => (
        <TextField
          {...field}
          variant='outlined'
          required
          fullWidth
          id='password'
          type={showPassword ? 'text' : 'password'}
          label='Contraseña'
          error={errors.password?.message}
          size='large'
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
