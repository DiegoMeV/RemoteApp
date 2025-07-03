import { Controller, useForm } from 'react-hook-form'
import { TextField, Button, Box, CircularProgress } from '@mui/material'

import styles from '../styles/Login.module.css'
import { PasswordInput } from '@/lib'

const FormSiifWeb = ({ groupSiifWeb }) => {
  const { loginSiifWeb, loadingSiifWeb } = groupSiifWeb
  const form = useForm({
    defaultValues: {
      user: '',
      pass: '',
    },
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data) => {
    try {
      await loginSiifWeb(data)
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
        name='user'
        control={form.control}
        render={({ field, formState: { errors } }) => (
          <TextField
            {...field}
            variant='outlined'
            required
            fullWidth
            id='user'
            type='user'
            label='Usuario de SIIFWEB'
            error={errors.email?.message}
            autoFocus
            size='large'
          />
        )}
      />
      <PasswordInput
        form={form}
        name='pass'
      />

      <Button
        type='submit'
        disabled={loadingSiifWeb}
        fullWidth
        variant='contained'
        size='large'
        color='primary'
        className={styles.boton_login}
      >
        {loadingSiifWeb ? <CircularProgress color='inherit' /> : 'Entrar'}
      </Button>
    </Box>
  )
}

export default FormSiifWeb
