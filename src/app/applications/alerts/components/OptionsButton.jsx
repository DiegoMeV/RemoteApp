import { MoreVert } from '@mui/icons-material'
import { Box, IconButton } from '@mui/material'

const OptionsButton = () => {
  return (
    <Box
      width='100%'
      display='flex'
      justifyContent='center'
    >
      <IconButton
        variant='contained'
        color='primary'
      >
        <MoreVert />
      </IconButton>
    </Box>
  )
}

export default OptionsButton
