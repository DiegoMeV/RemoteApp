import { Box, Button } from '@mui/material'

const NewCompromiseButton = ({ handleNewRow, isTotallyApp }) => (
  <Box
    display='flex'
    justifyContent='flex-end'
    mb={2}
    mr={2}
  >
    <Button
      variant='contained'
      component='span'
      onClick={handleNewRow}
      disabled={isTotallyApp}
    >
      Nuevo compromiso
    </Button>
  </Box>
)
export default NewCompromiseButton
