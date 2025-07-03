import { Box, Typography } from '@mui/material'
import { StepperHeaderStyleContainer } from './styles'

const StepperHeader = ({ headerTitle }) => {
  return (
    <Box
      component='section'
      sx={StepperHeaderStyleContainer}
    >
      <Typography
        variant='h6'
        color='primary'
      >
        {headerTitle}
      </Typography>
    </Box>
  )
}

export default StepperHeader
