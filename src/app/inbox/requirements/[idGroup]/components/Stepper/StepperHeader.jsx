import { Box, Typography } from '@mui/material'
import { StepperHeaderStyleContainer } from '../../styles'

const StepperHeader = () => {
  return (
    <Box
      component='section'
      sx={StepperHeaderStyleContainer}
    >
      <Typography
        variant='h6'
        color='primary'
      >
        Radicación
      </Typography>
    </Box>
  )
}

export default StepperHeader
