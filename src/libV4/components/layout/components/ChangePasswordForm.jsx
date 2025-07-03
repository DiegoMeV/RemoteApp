import { useMutationDynamicBaseUrl } from '@/lib/api'
import { Box, Button, Typography } from '@mui/material'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { boxButtons, boxForm, boxInputs } from '../styles/stylesSx'
import { PasswordInput } from '@/libV4/ui'
import { TermsAndConditions } from '../../TermsAndConditions'

const ChangePasswordForm = ({ handleClose }) => {
  const form = useForm({
    defaultValues: {
      password: '',
      newPassword: '',
    },
  })

  const newPassword = form.watch('newPassword')
  const confirmPassword = form.watch('password')

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
      onSubmit={form.handleSubmit(onSubmit)}
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
        <PasswordInput
          form={form}
          name='newPassword'
        />
        <PasswordInput form={form} />
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
