import { Box, Stack, Typography } from '@mui/material'
import { summaryStyles } from '../styles/stylesSx'

const Summary = ({ title, total, icon, color = 'error', ...other }) => {
  return (
    <Stack
      sx={summaryStyles(color)}
      {...other}
    >
      {icon && <Box sx={{ width: 64, height: 64, mb: 1 }}>{icon}</Box>}

      <Typography variant='h3'>{total}</Typography>

      <Typography
        variant='subtitle2'
        sx={{ opacity: 0.64 }}
      >
        {title}
      </Typography>
    </Stack>
  )
}

export default Summary
