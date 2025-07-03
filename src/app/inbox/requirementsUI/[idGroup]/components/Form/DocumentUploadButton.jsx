import { Box, Button } from '@mui/material'

const DocumentUploadButton = ({ handleNewRow }) => (
  <Box
    display='flex'
    justifyContent='flex-end'
    mb={2}
  >
    <Button
      variant='contained'
      component='span'
      onClick={handleNewRow}
    >
      Subir Archivo
    </Button>
  </Box>
)

export default DocumentUploadButton
