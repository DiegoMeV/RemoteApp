import { Email } from '@mui/icons-material'
import { authVar, baseUrls, GenericSquareButton, ImageButton, svgs } from '@/libV4'
import '../styles/styles.css'
import { useDefaultAuth } from '@/lib'

const LoginButtons = ({ magicLink, setMagicLink, loginSiif, setLoginSiif, formLogin }) => {
  const devMode = useDefaultAuth()

  const handleSiifWeb = () => {
    setMagicLink(false)
    setLoginSiif(!loginSiif)
    formLogin.reset()
  }
  const handleMagicLink = () => {
    setLoginSiif(false)
    setMagicLink(!magicLink)
    formLogin.reset()
  }
  const authVarArray = authVar?.options

  const buttons = [
    {
      validation: 'GOOGLE',
      component: (
        <ImageButton
          key='google'
          text='Inicio Google'
          alt='Logo-Google'
          src={svgs.LogoGoogle}
          href={`${baseUrls.urlUsers}/auth/login/federated/google/?builder=true`}
          fullWidth
        />
      ),
    },
    {
      validation: 'MICROSOFT',
      component: (
        <ImageButton
          key='microsoft'
          text='Inicio Microsoft'
          alt='Logo-Microsoft'
          src={svgs.LogoMicrosoft}
          href={`${baseUrls.urlUsers}/auth/azure/signin`}
          fullWidth
        />
      ),
    },
    {
      validation: 'SIIFWEB',
      component: (
        <ImageButton
          key='siifweb'
          text='Inicio SIIFWEB'
          src={svgs.LogoSiifweb}
          alt='Logo siifweb'
          fullWidth
          onClick={handleSiifWeb}
          sx={
            loginSiif
              ? {
                  backgroundColor: '#0072c6',
                  color: 'white',
                  '&:hover': { backgroundColor: '#005a9e' },
                }
              : {}
          }
        />
      ),
    },
    {
      validation: 'MAGIC_LINK',
      component: (
        <GenericSquareButton
          key='link'
          variant='outlined'
          textProps={{ label: 'Link de acceso', sx: { fontSize: '0.7rem' } }}
          startIcon={<Email />}
          size='large'
          fullWidth
          onClick={handleMagicLink}
          sx={
            magicLink
              ? {
                  backgroundColor: '#0072c6',
                  color: 'white',
                  '&:hover': { backgroundColor: '#005a9e' },
                }
              : {}
          }
        />
      ),
    },
  ]

  const buttonToShow = devMode
    ? buttons
    : buttons.filter((button) => authVarArray.includes(button.validation))

  return (
    <div className='login_buttons'>
      {buttonToShow.map((button, index) => (
        <div
          key={index}
          className={`button ${
            buttonToShow.length === 2
              ? 'col-span-2'
              : buttonToShow.length === 3 && index === 2
              ? 'col-span-2'
              : buttonToShow.length % 2 !== 0 && index === buttonToShow.length - 1
              ? 'col-span-full flex justify-center'
              : ''
          }`}
        >
          {button?.component}
        </div>
      ))}
    </div>
  )
}

export default LoginButtons
