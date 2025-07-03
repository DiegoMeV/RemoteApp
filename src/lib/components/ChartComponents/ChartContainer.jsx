import { Box, Typography } from '@mui/material'
import { chartContainerStyles, titleStyles } from './styles'

const ChartContainer = ({ title, minHeight, children }) => {
  return (
    <Box
      sx={chartContainerStyles}
      minHeight={minHeight ?? 'auto'}
    >
      <Box sx={titleStyles}>
        <Typography
          variant='h6'
          color='primary'
        >
          {title ?? ''}
        </Typography>
      </Box>
      {children}
    </Box>
  )
}

export default ChartContainer
