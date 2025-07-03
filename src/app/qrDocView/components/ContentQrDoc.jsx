import { Container } from '@mui/material'
import { contentQrCode } from '../styles'

const ContentQrDoc = ({ children }) => {
  return (
    <Container
      component='aside'
      maxWidth='lg'
      disableGutters
      sx={contentQrCode}
    >
      {children}
    </Container>
  )
}

export default ContentQrDoc
