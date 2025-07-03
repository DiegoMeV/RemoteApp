import { Box, Button } from '@mui/material'
import { useCallback, useEffect } from 'react'
import { useDropzone } from 'react-dropzone'

const UploadFileDynamic = ({ form, name }) => {
  const { register, setValue } = form

  const onDrop = useCallback(
    (acceptedFiles) => {
      setValue(name, acceptedFiles, { shouldValidate: true })
    },
    [name, setValue]
  )

  useEffect(() => {
    register(name)
  }, [register, name])

  const { getRootProps, getInputProps } = useDropzone({
    multiple: false,
    onDrop,
  })

  return (
    <Box
      container
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <Button
        variant='contained'
        component='span'
      >
        Seleccionar archivo
      </Button>
    </Box>
  )
}

export default UploadFileDynamic
