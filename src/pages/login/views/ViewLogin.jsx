import {
  EmailField,
  LoginButtons,
  LoginFormContainer,
  LoginHeader,
  PasswordField,
} from '../components'
import Logo from '../components/BrandSection'
import { Box, Button } from '@mui/material'
import { Brightness4 } from '@mui/icons-material'
import ReCAPTCHA from 'react-google-recaptcha'
import { recaptchaKeys, GenericSquareButton, useRootStore, TermsAndConditions } from '@/libV4'

const LoginForm = ({
  formLogin,
  onSubmit,
  loading,
  magicLink,
  setMagicLink,
  loginSiif,
  setLoginSiif,
  recaptchaRef,
}) => {
  const { setDark } = useRootStore()

  return (
    <LoginFormContainer>
      <Logo />
      <form
        className='login_info backgroundwhite1'
        onSubmit={formLogin.handleSubmit(onSubmit)}
      >
        <div className='absolute top-2 right-2'>
          <Button
            size='small'
            startIcon={<Brightness4 />}
            sx={{
              color: 'white',
              textTransform: 'none',
            }}
            onClick={() => setDark()}
          >
            Cambiar modo
          </Button>
        </div>

        <LoginHeader />
        <h1 className='login_title'>Iniciar sesión</h1>
        <LoginButtons
          magicLink={magicLink}
          setMagicLink={setMagicLink}
          loginSiif={loginSiif}
          setLoginSiif={setLoginSiif}
          formLogin={formLogin}
        />
        <EmailField
          control={formLogin.control}
          magicLink={magicLink}
          loginSiif={loginSiif}
        />
        {magicLink && (
          <Box
            display='flex'
            justifyContent='center'
          >
            <ReCAPTCHA
              ref={recaptchaRef}
              sitekey={recaptchaKeys?.siteKey}
            />
          </Box>
        )}
        {!magicLink && (
          <PasswordField
            control={formLogin.control}
            magicLink={magicLink}
            loginSiif={loginSiif}
          />
        )}

        <GenericSquareButton
          textProps={{
            label: 'Iniciar sesión',
            sx: {},
          }}
          loading={loading}
          size='large'
          type='submit'
          disabled={loading}
        />

        <TermsAndConditions />
      </form>
    </LoginFormContainer>
  )
}

export default LoginForm
