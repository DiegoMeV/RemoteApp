import { BackdropLoading, useMutationDynamicBaseUrl } from '@/lib'
import { useTheme } from '@emotion/react'
import { InfoOutlined } from '@mui/icons-material'
import { Box, Button, CircularProgress, TextField, Typography, useMediaQuery } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const TwoFactorModal = () => {
  const theme = useTheme()
  const isSm = useMediaQuery(theme.breakpoints.down('sm'))
  const { register, handleSubmit } = useForm()
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const { mutateAsync: verifyKeyAuth, isPending: isPendingVerifyKeyAuth } =
    useMutationDynamicBaseUrl({
      baseKey: 'urlUsers',
      url: '/auth/verify-2fa-code',
      method: 'POST',
      onSuccess: () => {
        toast.success('Inicio de sesión exitoso')
        setLoading(true)
        navigate('/selectCompany')
      },
      onError: (e) => {
        toast.error(e?.response?.data?.error ?? 'Error al verificar el código')
      },
    })

  const onSubmit = (data) => {
    verifyKeyAuth({ body: data })
  }

  return (
    <Box
      bgcolor={'backgroundGrey2'}
      p={2}
      borderRadius={2}
    >
      {loading && <BackdropLoading loading={loading} />}
      <Box
        bgcolor={'backgroundWhite1'}
        display={'flex'}
        flexDirection={'column'}
        p={4}
        borderRadius={2}
        gap={3}
        component='form'
        onSubmit={handleSubmit(onSubmit)}
      >
        {isPendingVerifyKeyAuth ? (
          <CircularProgress />
        ) : (
          <>
            <Box
              display={'flex'}
              alignItems={'center'}
              gap={4}
            >
              <InfoOutlined
                color='warning'
                sx={{ fontSize: isSm ? '60px' : '120px' }}
              />
              <Typography
                color={'secondary'}
                fontSize={isSm ? '1.2rem' : '2.2rem'}
                align='center'
              >
                Ingrese el código enviado a su correo
              </Typography>
            </Box>
            <TextField
              {...register('code')}
              label='Código'
              variant='outlined'
              fullWidth
            />
            <Button
              variant='contained'
              color='primary'
              type='submit'
              sx={{ width: '20%', alignSelf: 'flex-end' }}
            >
              Enviar
            </Button>
          </>
        )}
      </Box>
    </Box>
  )
}

export default TwoFactorModal
