import { Controller, useForm } from 'react-hook-form'
import { TextField, Button, Box, CircularProgress } from '@mui/material'
import styles from '../styles/Login.module.css'
import { PasswordInput } from '@/lib'

const FormLogin = ({ groupLogin }) => {
  const { login, loadingPushLogin } = groupLogin
  const form = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      await login(data)
    } catch (error) {
      console.error(`An error has ocurred: ${error.message}`)
    }
  }
  return (
    <Box
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
      display='flex'
      flexDirection='column'
      gap={{ xs: 1, md: 3 }}
    >
      <Controller
        name='email'
        control={form.control}
        render={({ field, formState: { errors } }) => (
          <TextField
            {...field}
            variant='outlined'
            required
            fullWidth
            id='email'
            type='email'
            label='Email'
            error={errors.email?.message}
            autoFocus
            size='large'
          />
        )}
      />
      <PasswordInput form={form} />
      <Button
        type='submit'
        disabled={loadingPushLogin}
        fullWidth
        variant='contained'
        size='large'
        color='primary'
        className={styles.boton_login}
      >
        {loadingPushLogin ? <CircularProgress color='inherit' /> : 'Entrar'}
      </Button>
    </Box>
  )
}

export default FormLogin
