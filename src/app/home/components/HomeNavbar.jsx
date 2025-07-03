import { AppBar, Button, Toolbar } from '@mui/material'

const buttons = [
  {
    label: 'Inicio',
  },
  {
    label: 'Manuales',
  },
  {
    label: 'Soporte',
  },
  {
    label: 'Contacto',
  },
]

const HomeNavbar = () => {
  return (
    <AppBar position='static'>
      <Toolbar
        sx={{
          width: '100%',
          backgroundColor: 'backgroundGrey2',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          style={{
            width: '100%',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <img
            src='/assets/svg/logoSiifWebWithText.svg'
            alt='Logo SiifWeb'
            width={163}
            height={42}
          />
          <div
            style={{
              display: 'flex',
              columnGap: 10,
              alignItems: 'center',
            }}
          >
            {buttons.map((button, index) => {
              return (
                <Button
                  key={index}
                  color='secondary'
                  size='medium'
                  sx={{
                    textTransform: 'none',
                    fontSize: 16,
                  }}
                >
                  {button.label}
                </Button>
              )
            })}
          </div>
        </div>
      </Toolbar>
    </AppBar>
  )
}

export default HomeNavbar
