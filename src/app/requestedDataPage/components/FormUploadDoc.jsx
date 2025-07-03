import React, { useState } from 'react'
import { Box } from '@mui/material'
import { CommonTextField, ClassicIconButton, useUploadDocument } from '@/lib' // Asumiendo importaciones correctas
import { useDropzone } from 'react-dropzone'
import NoteAdd from '@mui/icons-material/NoteAdd'
import Delete from '@mui/icons-material/Delete'
import SaveIcon from '@mui/icons-material/Save'
import toast from 'react-hot-toast'
const ContainerForm = ({ idCompany, idActivity, idProcess }) => {
  const [file, setFile] = useState(null)
  const [fileName, setFileName] = useState('')
  const [description, setDescription] = useState('')
  const { mutateAsync: uploadDoc, isPending } = useUploadDocument({
    newCompanyId: idCompany,
    onSuccess: () => {
      toast.success('Documento cargado correctamente')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: (acceptedFiles) => {
      setFileName(acceptedFiles[0].name)
      setFile(acceptedFiles[0])
    },
  })

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('description', description)
      formData.append('nombreMostrar', fileName)
      formData.append('idActivity', idActivity)
      formData.append('idProceso', idProcess)

      try {
        await uploadDoc(formData)
      } catch (error) {
        console.error('Error subiendo el archivo:', error)
      }
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '10px',
        width: '100%',
        gap: '10px',
      }}
    >
      <CommonTextField
        disabled={isPending}
        label='Descripción'
        name='descripcion'
        handleChange={(e) => setDescription(e.target.value)}
        sx={{ flexGrow: 1 }}
      />
      <CommonTextField
        label='Archivo cargado'
        name='archivo'
        value={fileName}
        disabled={true}
        handleChange={null}
        sx={{ flexGrow: 1 }}
        InputProps={{
          readOnly: true,
        }}
      />
      <div
        {...getRootProps()}
        style={{ display: 'inline-block' }}
      >
        <input {...getInputProps()} />
        <ClassicIconButton
          disabled={isPending}
          title='Agregar archivo'
          placement='bottom'
          hoverColor='gray'
        >
          <NoteAdd fontSize='large' />
        </ClassicIconButton>
      </div>
      <ClassicIconButton
        disabled={isPending}
        title='Guardar'
        placement='bottom'
        hoverColor='gray'
        onClick={uploadFile}
      >
        <SaveIcon fontSize='large' />
      </ClassicIconButton>
      <ClassicIconButton
        disabled={isPending}
        onClick={() => {
          setFileName('')
        }}
        title='Eliminar archivo'
        placement='bottom'
        hoverColor='gray'
        color='error'
      >
        <Delete fontSize='large' />
      </ClassicIconButton>
    </Box>
  )
}

export default ContainerForm
