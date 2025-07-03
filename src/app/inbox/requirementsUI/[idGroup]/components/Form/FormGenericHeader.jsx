import { Box, Typography } from '@mui/material'
import { StepperHeaderStyleContainer } from '../../styles'

const FormGenericHeader = ({ title }) => {
  return (
    <Box
      component='section'
      sx={StepperHeaderStyleContainer}
    >
      <Typography
        variant='h6'
        color='primary'
      >
        {title}
      </Typography>
    </Box>
  )
}

export default FormGenericHeader
