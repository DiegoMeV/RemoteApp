import { Avatar, Box, CircularProgress, Stack, Typography } from '@mui/material'
import { AddAPhoto, Close } from '@mui/icons-material'
import { useDropzone } from 'react-dropzone'
import { sxAvatar, sxDropzone, sxStack } from '../styles/stylesSx'
import { ClassicIconButton, useImage } from '@/lib'
import { useEffect, useState } from 'react'

const AccountDropzone = ({ userData, setFile }) => {
  const { data: dataImage, isLoading: isLoadingImg } = useImage(userData?.preferences?.avatar)
  const [previewUrl, setPreviewUrl] = useState(dataImage?.url || '')
  const [fileSizeError, setFileSizeError] = useState(false)

  useEffect(() => {
    setPreviewUrl(dataImage?.url || '')
  }, [dataImage])

  const handleRemoveImage = () => {
    setPreviewUrl('') // Limpiar la URL de la imagen
    setFile(['']) // Limpiar el archivo seleccionado
    setFileSizeError(false) // Limpiar el mensaje de error
  }

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0]
    if (file && file.size <= 3 * 1024 * 1024) {
      setPreviewUrl(URL.createObjectURL(file))
      setFile([file])
      setFileSizeError(false) // Limpiar el mensaje de error si la imagen es válida
    } else {
      setFileSizeError(true) // Mostrar el mensaje de error si la imagen excede el límite
    }
  }

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: onDrop,
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
    },
    noClick: true, // Evita que se abra el selector de archivos al hacer clic en el dropzone
    maxSize: 5 * 1024 * 1024, // Establece el límite máximo de 5MB
  })

  const handleAvatarClick = () => {
    // Simula un clic en el input de tipo archivo al hacer clic en el avatar
    const inputElement = document.getElementById('image-upload')
    if (inputElement) {
      inputElement.click()
    }
  }

  return (
    <Box sx={{ position: 'relative' }}>
      <div {...getRootProps()}>
        <input
          {...getInputProps()}
          id='image-upload'
          style={{ display: 'none' }}
        />
        <Avatar
          src={previewUrl}
          alt={userData ? userData?.email?.toUpperCase() : ''}
          sx={sxAvatar}
          onClick={handleAvatarClick}
        >
          <Stack sx={sxStack}>
            {!isLoadingImg ? (
              <>
                {!previewUrl && !dataImage?.url && (
                  <>
                    <AddAPhoto fontSize='small' />
                    <Typography
                      variant='body2'
                      style={{ fontSize: 'small' }}
                    >
                      Agrega foto
                    </Typography>
                  </>
                )}
              </>
            ) : (
              <CircularProgress />
            )}
          </Stack>
        </Avatar>
      </div>
      {fileSizeError && (
        <Typography
          variant='caption'
          color='error'
        >
          El archivo excede el límite de 3MB.
        </Typography>
      )}
      <Box
        sx={sxDropzone}
        bgcolor='error.main'
        as='div'
      >
        <ClassicIconButton
          placement='right'
          title='Eliminar Imagen'
          onClick={handleRemoveImage}
          color='white'
        >
          <Close
            size='small'
            sx={{ width: '15px', height: '15px' }}
          />
        </ClassicIconButton>
      </Box>
    </Box>
  )
}

export default AccountDropzone
