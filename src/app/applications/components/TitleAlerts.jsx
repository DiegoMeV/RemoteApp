import { ClassicIconButton } from '@/lib'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { titleStyles } from './styles'

const TitleAlerts = ({
  title,
  backpath,
  handleBack = (func) => {
    func()
  },
}) => {
  const navigate = useNavigate()

  const navigationToView = () => {
    navigate(backpath)
  }

  return (
    <Box sx={titleStyles}>
      {backpath && (
        <ClassicIconButton
          onClick={() => handleBack(navigationToView)}
          title='Regresar'
        >
          <ArrowBack />
        </ClassicIconButton>
      )}
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

export default TitleAlerts
