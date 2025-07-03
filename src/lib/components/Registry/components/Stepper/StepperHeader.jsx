import { Box, Typography } from '@mui/material'
import { MagicString } from '@/lib'
import { StepperHeaderStyleContainer } from './StepperStyles'

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
        {MagicString.REGISTRY.TITLE}
      </Typography>
    </Box>
  )
}

export default StepperHeader
