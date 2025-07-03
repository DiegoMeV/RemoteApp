import { GenericTextfield } from '@/libV4'
import { Controller } from 'react-hook-form'

const PasswordField = ({ control, loginSiif }) => {
  return (
    <Controller
      name={loginSiif ? 'pass' : 'password'}
      control={control}
      rules={{ required: true }}
      render={({ field, fieldState: { error } }) => (
        <GenericTextfield
          label='Contraseña'
          error={!!error}
          type='password'
          helperText={error ? error.message : null}
          size='medium'
          {...field}
        />
      )}
    />
  )
}

export default PasswordField
