import { Container, Typography, Paper } from '@mui/material'

import { containerErrorPage, paperErrorPage } from './styles/styles'

const ErrorPage = () => {
  return (
    <Container style={containerErrorPage}>
      <Paper
        elevation={3}
        style={paperErrorPage}
      >
        <img
          src='/assets/svg/logoloading.svg'
          alt='/assets/svg/logoloading.svg'
          width={250}
          height={250}
        />
        <Typography variant='h4'>Esta página tiene un error</Typography>
        <Typography variant='subtitle1'>
          Estamos trabajando en esta página. ¡Pronto estará disponible!
        </Typography>
      </Paper>
    </Container>
  )
}

export default ErrorPage
