import { ClassicIconButton } from '@/lib'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { titleStyles } from './styles'

const HeaderViewAlert = ({ title, handleBack = () => {} }) => {
  return (
    <Box sx={titleStyles}>
      <ClassicIconButton
        onClick={() => handleBack()}
        title='Regresar'
      >
        <ArrowBack />
      </ClassicIconButton>
      <Typography
        variant='h5'
        textAlign='start'
        color='primary'
      >
        {title}
      </Typography>
    </Box>
  )
}

export default HeaderViewAlert
