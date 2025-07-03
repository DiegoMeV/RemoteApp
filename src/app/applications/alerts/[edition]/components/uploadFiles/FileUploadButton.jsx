import { Box, Button } from '@mui/material'

export const FileUploadButton = ({ onUpload, isMultiple = false, disabled = false }) => (
  <Box
    display='flex'
    justifyContent='flex-end'
    mb={2}
  >
    <input
      type='file'
      accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
      onChange={onUpload}
      style={{ display: 'none' }}
      id='file-upload'
      multiple={isMultiple}
    />
    <label htmlFor='file-upload'>
      <Button
        variant='contained'
        component='span'
        disabled={disabled}
      >
        Subir Archivo
      </Button>
    </label>
  </Box>
)
