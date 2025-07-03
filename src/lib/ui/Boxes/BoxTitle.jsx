import { ClassicIconButton } from '@/lib'
import { Box, Typography } from '@mui/material'
import { containerTitle } from './styles'
import { ArrowBack } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'

const BoxTitle = ({ title, backPath, sxBox, hTitle = 'h5', complement = '' }) => {
  const navigate = useNavigate()
  return (
    <Box
      component='header'
      sx={{ ...containerTitle, ...sxBox }}
    >
      {backPath && (
        <ClassicIconButton
          onClick={() => navigate(backPath)}
          title='Atras'
          placement='bottom'
        >
          <ArrowBack />
        </ClassicIconButton>
      )}
      <Typography
        variant={hTitle}
        textAlign='start'
        color='primary'
      >
        {title}
      </Typography>
      <Typography
        variant={hTitle}
        textAlign='start'
        color='primary'
      >
        {complement}
      </Typography>
    </Box>
  )
}

export default BoxTitle
