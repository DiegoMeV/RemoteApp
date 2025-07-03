import { Box, Typography } from '@mui/material'
import { TreasuryContainer } from '../components'
import { ArrowBack } from '@mui/icons-material'
import { greyContainer, treasuryPageTextContainer } from './styles'

const Treasury = () => {
  return (
    <TreasuryContainer>
      <Box
        sx={greyContainer}
        mt={2}
      >
        <Box sx={treasuryPageTextContainer}>
          <ArrowBack
            color='primary'
            fontSize='large'
          />
          <Typography
            variant='body1'
            color='secondary'
          >
            Seleccione un sector para ver las órdenes de pago.
          </Typography>
        </Box>
      </Box>
    </TreasuryContainer>
  )
}

export default Treasury
