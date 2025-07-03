import { Box, Typography } from '@mui/material'
import {
  BrandSection,
  ContentLogin,
  ContainerFormsLogin,
  ChangeModeThemeApplication,
} from '../components'
import FormLogin from './FormLogin'
import FormMagicLink from './FormMagicLink'
import { useBackgroundColorSx } from '../styles/styleSX'
import { defaultOption } from '../funcs'
import { CustomModal, useDefaultAuth, TwoFactorModal, useTwoFactorModalClose } from '@/lib'
import FormSiifWeb from './FormSiifWeb'

const ViewLogin = ({
  groupLogin,
  groupSiifWeb,
  groupMagicLink,
  authOption,
  setAuthOption,
  selectOption,
}) => {
  const { twoFactorModal } = groupLogin
  const backgroundColor = useBackgroundColorSx()
  const devMode = useDefaultAuth()
  const handleCloseTwoFactorModal = useTwoFactorModalClose(twoFactorModal)

  return (
    <Box sx={backgroundColor}>
      <ChangeModeThemeApplication />
      <ContentLogin>
        <BrandSection />
        {twoFactorModal?.show && (
          <CustomModal
            open={twoFactorModal?.show}
            title={'Verificación dos pasos'}
            handleClose={handleCloseTwoFactorModal}
            size={'md'}
          >
            <TwoFactorModal />
          </CustomModal>
        )}
        <ContainerFormsLogin
          authOption={authOption}
          setAuthOption={setAuthOption}
          selectOption={selectOption}
        >
          {defaultOption(devMode) && (
            <>
              {authOption?.['MAGIC_LINK'] ? (
                <FormMagicLink groupMagicLink={groupMagicLink} />
              ) : authOption?.['SIIFWEB'] ? (
                <FormSiifWeb groupSiifWeb={groupSiifWeb} />
              ) : (
                <FormLogin groupLogin={groupLogin} />
              )}
            </>
          )}
        </ContainerFormsLogin>
      </ContentLogin>
      <Box sx={{ position: 'absolute', bottom: '0', display: 'flex', justifyContent: 'center' }}>
        <Typography sx={{ color: '#D9D9D9' }}>
          © 1996-2024. - Producto de Soluciones de Información
        </Typography>
      </Box>
    </Box>
  )
}

export default ViewLogin
