import { BackdropLoading, PasswordInput } from '@/lib'
import { Box, Button } from '@mui/material'
import { UserInfoChangePass } from '.'

const ModalChangePassUser = ({
  form = {},
  openModal = {},
  infoUserSelected = {},
  isPendingUserPass = false,
} = {}) => {
  const passwordValue = form?.watch('password')

  const handleCancel = () => {
    form?.reset()
    openModal?.handleShow()
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, p: '20px' }}>
      <BackdropLoading loading={isPendingUserPass} />
      <UserInfoChangePass infoUserSelected={infoUserSelected} />
      <PasswordInput
        form={form}
        name='password'
        label='Nueva Contraseña'
        validationRules={{
          required: 'La contraseña es obligatoria',
        }}
      />

      <PasswordInput
        form={form}
        name='confirmPassword'
        label='Confirmar contraseña'
        validationRules={{
          required: 'Confirma tu contraseña',
          validate: (value) => value === passwordValue || 'Las contraseñas no coinciden',
        }}
      />
      <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
        <Button
          variant='contained'
          type='submit'
        >
          Actualizar contraseña
        </Button>
        <Button
          variant='contained'
          color='secondary'
          onClick={handleCancel}
        >
          Cancelar
        </Button>
      </Box>
    </Box>
  )
}

export default ModalChangePassUser
