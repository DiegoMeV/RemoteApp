import { Fragment, useState } from 'react'

import { Box, Grid, Typography } from '@mui/material'
import { ButtonAuthGoogle, ButtonAuthMicrosoft, ButtonSiifWeb, Redirect } from '../components'

import ButtonSelectMagicLink from './ButtonSelectMagicLink'
import { useStoreState } from 'easy-peasy'
import { buttonsAuth, defaultOption } from '../funcs'
import { authVar, BackdropLoading, stringToObject, useDefaultAuth } from '@/lib'
import { TermsAndConditions } from '@/libV4'

const ContainerFormsLogin = ({ children, authOption, setAuthOption, selectOption }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'VITE_THEME_APPLICATION')
  const devMode = useDefaultAuth()
  const [isLoadingButton, setIsLoadingButton] = useState(false)
  const loginOptions = [
    { name: 'GOOGLE', component: <ButtonAuthGoogle setIsLoadingButton={setIsLoadingButton} /> },
    {
      name: 'MICROSOFT',
      component: <ButtonAuthMicrosoft setIsLoadingButton={setIsLoadingButton} />,
    },
    {
      name: 'SIIFWEB',
      component: (
        <ButtonSiifWeb
          authOption={authOption}
          setAuthOption={setAuthOption}
          selectOption={selectOption}
        />
      ),
    },
    {
      name: 'MAGIC_LINK',
      component: (
        <ButtonSelectMagicLink
          authOption={authOption}
          setAuthOption={setAuthOption}
          selectOption={selectOption}
        />
      ),
    },
  ]
  const optionsAuthVar = authVar.options.split(',')
  const totalOptions = optionsAuthVar.map((option) => ({ name: option }))
  return (
    <Grid
      item
      container
      md={5}
      xs={12}
      position='relative'
      justifyContent='space-around'
      p={2}
    >
      <BackdropLoading loading={isLoadingButton} />
      <Grid
        item
        sm={6}
        xs={12}
        display='flex'
        justifyContent={{ xs: 'center', sm: 'flex-start' }}
        alignItems='center'
      >
        <Typography
          variant='h5'
          color={themeApp?.primary ? 'secondary' : 'primary'}
          sx={{ fontStyle: 'italic' }}
        >
          <Box
            mb={{ xs: '5', md: '15px' }}
            textAlign='start'
          >
            ¡Hola!
          </Box>
          <strong>Bienvenidos</strong>
        </Typography>
      </Grid>
      <Grid
        item
        sm={6}
        xs={12}
        display='flex'
        justifyContent={{ xs: 'center', sm: 'flex-end' }}
        alignItems='center'
      >
        <img
          src={
            dark === 'dark'
              ? themeApp?.verticalImgDark || '/assets/svg/vertical-synchrox-logo-black.svg'
              : themeApp?.verticalImg || '/assets/svg/vertical-synchrox-logo.svg'
          }
          style={{
            width: '80px',
            height: 'auto',
          }}
          alt='Imagen compnania'
        />
      </Grid>
      <Grid
        item
        xs={12}
      >
        <Typography
          color='secondary'
          fontSize={'1rem'}
          textAlign='center'
          sx={{ fontStyle: 'italic' }}
        >
          Iniciar sesión
        </Typography>
      </Grid>
      <Grid
        container
        spacing={2}
        justifyContent='center'
      >
        {!defaultOption(devMode) && <Redirect />}
        {loginOptions.map((option, index) => (
          <Fragment key={index}>
            {buttonsAuth(option.name, devMode) && (
              <Grid
                item
                xs={12}
                sm={totalOptions.length === 3 ? 4 : 5}
              >
                {option.component}
              </Grid>
            )}
          </Fragment>
        ))}
      </Grid>
      <Grid
        item
        xs={12}
        mt={2}
      >
        {children}
      </Grid>
      <Grid
        item
        xs={12}
        display='flex'
        justifyContent='center'
        alignItems='flex-end'
        textAlign='center'
      >
        <TermsAndConditions />
      </Grid>
    </Grid>
  )
}

export default ContainerFormsLogin
