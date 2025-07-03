import { Box, Typography } from '@mui/material'
import { containerTitleQrCode } from '../styles'

const TitleQrDoc = ({ title = '', fontSize = '22px', tag='body1' }) => {
  return (
    <Box
      aria-label='title-section'
      sx={containerTitleQrCode}
    >
      <Typography
        variant={tag}
        color='primary'
        sx={{ fontSize, lineHeight: '30px', fontWeight: '400' }}
      >
        {title}
      </Typography>
    </Box>
  )
}

export default TitleQrDoc
