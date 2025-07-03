import { Container, Typography, Paper } from '@mui/material'

import { containerConstructionPage, paperConstructionPage } from './styles/styles'

const ConstructionPage = () => {
  return (
    <Container style={containerConstructionPage}>
      <Paper
        elevation={3}
        style={paperConstructionPage}
      >
        <img
          src='/assets/svg/logoloading.svg'
          alt='/assets/svg/logoloading.svg'
          width={250}
          height={250}
        />
        <Typography variant='h4'>Página en Construcción</Typography>
        <Typography variant='subtitle1'>
          Estamos trabajando en esta página. ¡Pronto estará disponible!
        </Typography>
      </Paper>
    </Container>
  )
}

export default ConstructionPage
