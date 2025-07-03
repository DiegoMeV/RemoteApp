import { Box, Typography } from '@mui/material'

export const TitleInfo = () => {
  return (
    <Box
      p={2}
      bgcolor={'backgroundGrey2'}
    >
      <Typography
        variant='h5'
        color='primary'
      >
        Datos del proceso
      </Typography>
    </Box>
  )
}
