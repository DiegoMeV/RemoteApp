import { ClassicIconButton } from '@/lib'
import { ArrowBack } from '@mui/icons-material'
import { Box, Typography } from '@mui/material'
import { titleStyles } from '../styles'
import { useNavigate } from 'react-router-dom'

const TitleAlerts = ({
  title,
  handleBack = (func) => {
    func()
  },
  backPath,
  path,
}) => {
  const navigate = useNavigate()

  const navigationToView = () => {
    navigate(path)
  }

  return (
    <Box sx={titleStyles}>
      {backPath && (
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
