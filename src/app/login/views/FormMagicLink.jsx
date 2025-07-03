import { Box, Button, CircularProgress, TextField } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'

import styles from '../styles/Login.module.css'
import ReCAPTCHA from 'react-google-recaptcha'
import { recaptchaKeys } from '@/lib'
import { useRef } from 'react'
import toast from 'react-hot-toast'

const FormMagicLink = ({ groupMagicLink }) => {
  const { loginMagicLink, loadingMagicLink } = groupMagicLink
  const recaptchaRef = useRef(null)

  const form = useForm({
    defaultValues: {
      destination: '',
    },
    mode: 'all',
    reValidateMode: 'onBlur',
  })

  const onSubmit = async (data) => {
    const captchaToken = recaptchaRef.current.getValue()
    if (!captchaToken) {
      toast.error('Por favor, complete la verificación de seguridad.')
      return
    }

    try {
      await loginMagicLink({ ...data, captchaToken })
    } catch (error) {
      console.error(`An error has ocurred: ${error.message}`)
    }
  }
  return (
    <Box
      display='flex'
      flexDirection='column'
      component='form'
      onSubmit={form.handleSubmit(onSubmit)}
      gap={3}
    >
      <Controller
        name='destination'
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
          />
        )}
      />
      <Box
        display='flex'
        justifyContent='center'
      >
        <ReCAPTCHA
          ref={recaptchaRef}
          sitekey={recaptchaKeys?.siteKey}
        />
      </Box>

      <Button
        type='submit'
        disabled={loadingMagicLink}
        fullWidth
        variant='contained'
        size='large'
        color='primary'
        className={styles.boton_login}
      >
        {loadingMagicLink ? <CircularProgress color='inherit' /> : 'Enviar'}
      </Button>
    </Box>
  )
}

export default FormMagicLink
