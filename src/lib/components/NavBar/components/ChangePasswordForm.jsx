import { useMutationDynamicBaseUrl } from '@/lib/api'
import { Box, Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { boxButtons, boxForm, boxInputs } from '../styles/stylesSx'
import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { TermsAndConditions } from '@/libV4'

const ChangePasswordForm = ({ handleClose }) => {
  const [showPassword, setShowPassword] = useState({ newPassword: false, confirmPassword: false })

  const handleClickShowPassword = (input) =>
    setShowPassword((showPassword) => ({ ...showPassword, [input]: !showPassword[input] }))

  const handleMouseDownPassword = (event) => {
    event.preventDefault()
  }

  const { watch, control, handleSubmit } = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
    },
  })

  const newPassword = watch('newPassword')
  const confirmPassword = watch('password')

  const { mutateAsync: editPassword } = useMutationDynamicBaseUrl({
    isCompanyRequest: true,
    baseKey: 'urlUsers',
    method: 'put',
    url: '/users/password',
    onSuccess: () => {
      toast.success('Contraseña cambiada correctamente')
      handleClose()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const onSubmit = async (data) => {
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    await editPassword({ body: data })
  }

  return (
    <Box
      onSubmit={handleSubmit(onSubmit)}
      component={'form'}
      sx={boxForm}
    >
      <Box
        textAlign='center'
        color='primary'
      >
        <Typography
          variant='h5'
          color='primary'
        >
          <strong>¡Hola!</strong>
        </Typography>
        <Typography color='primary'>Cambiar contraseña</Typography>
      </Box>
      <Box sx={boxInputs}>
        <Controller
          name='newPassword'
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              variant='outlined'
              required
              fullWidth
              type={showPassword?.newPassword ? 'text' : 'password'}
              label='Nueva contraseña'
              error={errors.email?.message}
              autoFocus
              size='large'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => handleClickShowPassword('newPassword')}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
        <Controller
          name='password'
          control={control}
          render={({ field, formState: { errors } }) => (
            <TextField
              {...field}
              variant='outlined'
              required
              fullWidth
              id='password'
              type={showPassword?.confirmPassword ? 'text' : 'password'}
              label='Confirmar contraseña'
              error={errors.password?.message}
              size='large'
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='toggle password visibility'
                      onClick={() => handleClickShowPassword('confirmPassword')}
                      onMouseDown={handleMouseDownPassword}
                    >
                      {showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Box>
      <Box sx={boxButtons}>
        <Button
          type='submit'
          fullWidth
          variant='contained'
          size='large'
          color='primary'
        >
          Actualizar
        </Button>
        <Button
          fullWidth
          variant='contained'
          size='large'
          color='secondary'
          onClick={handleClose}
        >
          Cancelar
        </Button>
      </Box>
      <TermsAndConditions />
    </Box>
  )
}

export default ChangePasswordForm
