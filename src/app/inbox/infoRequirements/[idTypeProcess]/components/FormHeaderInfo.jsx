import { Box, Typography } from '@mui/material'
import { headerStyle } from '../styles/radicationStyles'
import { ClassicIconButton } from '@/lib'
import { ArrowBack } from '@mui/icons-material'

import { useNavigate } from 'react-router-dom'

const FormHeaderInfo = ({ title }) => {
  const navigate = useNavigate()
  return (
    <Box
      component='section'
      sx={headerStyle}
    >
      <ClassicIconButton
        title='Volver'
        placement='bottom'
        onClick={() => {
          navigate(-1)
        }}
      >
        <ArrowBack />
      </ClassicIconButton>
      <Typography
        variant='h6'
        color='primary'
      >
        {title}
      </Typography>
    </Box>
  )
}
export default FormHeaderInfo
