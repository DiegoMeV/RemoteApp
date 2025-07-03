import { BackdropLoading, useBoolean, useUploadDocument } from '@/lib'
import { CloudUpload } from '@mui/icons-material'
import { Button, Grid, styled } from '@mui/material'
import toast from 'react-hot-toast'
import DocumentsByProcessModel from './DocumentsByProcessModel'

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

const FileButtons = ({ addFile, idProcess, idActivity, arrayOfFiles }) => {
  const documentProcessModal = useBoolean()

  const { mutateAsync: uploadDoc, isPending: loadingUploadDoc } = useUploadDocument({
    onSuccess: (response) => {
      const id = response?.data?.[0]?.id
      const name =
        !!response?.data?.[0]?.nombreMostrar && response?.data?.[0]?.nombreMostrar !== ''
          ? response?.data?.[0]?.nombreMostrar
          : response?.data?.[0]?.nombre
      if (!!id && !!name) {
        addFile({ id, name })
        return
      }
    },
    onError: () => {
      toast.error('Error al subir el archivo')
    },
  })

  const handleUploadDocument = (event) => {
    const File = new FormData()
    File.append('file', event.target.files[0])
    File.append('idActiviy', idActivity)
    File.append('idProceso', idProcess)
    uploadDoc(File)
  }

  const selectDocOfValueList = (params) => {
    const id = params?.row?.id
    const name =
      !!params?.row?.nombreMostrar && params?.row?.nombreMostrar !== ''
        ? params?.row?.nombreMostrar
        : params?.row?.nombre

    if (!!id && !!name) {
      addFile({ id, name })
      return
    }
    toast.error('No se pudo seleccionar el documento')
  }

  return (
    <>
      <BackdropLoading loading={loadingUploadDoc} />
      <Grid
        item
        container
        xs={12}
        columnGap={2}
      >
        <Button
          component='label'
          variant='contained'
          tabIndex={-1}
          startIcon={<CloudUpload />}
          onChange={handleUploadDocument}
        >
          Subir archivo
          <VisuallyHiddenInput type='file' />
        </Button>
        <Button
          variant='contained'
          onClick={documentProcessModal?.handleShow}
        >
          Documentos del proceso
        </Button>
        {documentProcessModal?.show && (
          <DocumentsByProcessModel
            idProcess={idProcess}
            documentProcessModal={documentProcessModal}
            selectDocOfValueList={selectDocOfValueList}
            arrayOfFiles={arrayOfFiles}
          />
        )}
      </Grid>
    </>
  )
}

export default FileButtons
