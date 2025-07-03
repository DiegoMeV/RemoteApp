import { GenericTextfield } from '@/libV4'
import { Controller } from 'react-hook-form'

const EmailField = ({ control, magicLink, loginSiif }) => (
  <Controller
    name={magicLink ? 'destination' : loginSiif ? 'user' : 'email'}
    control={control}
    rules={
      loginSiif
        ? {}
        : {
            required: true,
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
              message: 'El correo no es válido',
            },
          }
    }
    render={({ field, fieldState: { error } }) => (
      <GenericTextfield
        label={loginSiif ? 'Usuario de SIIFWEB' : 'Correo'}
        error={!!error}
        helperText={error?.message}
        size='medium'
        {...field}
      />
    )}
  />
)

export default EmailField
