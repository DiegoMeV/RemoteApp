import { styled } from '@mui/material/styles'
import Button from '@mui/material/Button'
import { CloudUpload } from '@mui/icons-material'
import { useState } from 'react'
import { Box, InputLabel } from '@mui/material'

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
})

const UploadFileButton = ({ title, accept, handleFileChange, register, color, required }) => {
  const [fileName, setFileName] = useState('')

  const handleFileUpload = (event) => {
    setFileName(event.target.files[0].name)
    if (handleFileChange) {
      handleFileChange(event)
    }
  }
  return (
    <Box>
      <Button
        component='label'
        fullWidth
        variant='contained'
        startIcon={<CloudUpload />}
        color={color ? color : 'primary'}
        onChange={handleFileUpload}
      >
        {title}
        <VisuallyHiddenInput
          type='file'
          accept={accept}
          required={!required}
          {...register('file')}
        />
      </Button>
      <InputLabel>{fileName}</InputLabel>
    </Box>
  )
}
export default UploadFileButton
