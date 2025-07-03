import toast from 'react-hot-toast'
import { CustomTextField, useBoolean } from '@/lib/ui'
import { FileShowed } from '@/app/inbox/[...ids]/components/ManagementActions/Notifications/Notification/components'
import { ButtonsDocSIGEDOC } from './components'
import { Box, Divider, Grid, Typography } from '@mui/material'

const AttachedDocumentsSIGEDOC = ({
  form,
  disabled = false,
  title = 'Documentos anexos al SIGEDOC',
  docsInformation = {},
  isProcessFiles = false,
  isDescriptionInput = false,
  idProcess,
  isDigitalFile = false,
  isPaddingFile = false,
}) => {
  const { arrDoc, setArrDoc } = docsInformation
  const documentProcessModal = useBoolean()

  const validateBtnDisabled = isDigitalFile && arrDoc?.length === 1

  const fileLoadend = (file, reader) => {
    const result = reader.result
    const base64Index = result.indexOf('base64,') + 'base64,'.length
    const base64 = result.substring(base64Index)

    setArrDoc((prevState) => {
      return [
        ...prevState,
        {
          id: crypto.randomUUID(),
          name: file.name,
          type: file.type,
          binarioCodificado: base64,
          archivoProceso: false,
        },
      ]
    })
  }

  const handleFileUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        fileLoadend(file, reader)
      }
      reader.readAsDataURL(file)
    }
  }

  const deleteFile = (id) => {
    if (disabled) return
    const newArray = arrDoc.filter((file) => file.id !== id)
    setArrDoc(newArray)
  }

  const addFile = (newItem) => {
    setArrDoc([...arrDoc, newItem])
  }

  const selectDocOfValueList = (params) => {
    if (validateBtnDisabled) {
      toast.error('No se puede agregar más de un documento en Archivo Digital.')
      return
    }
    const id = params?.row?.id
    const name =
      !!params?.row?.nombreMostrar && params?.row?.nombreMostrar !== ''
        ? params?.row?.nombreMostrar
        : params?.row?.nombre

    if (!!id && !!name) {
      addFile({ id, name, archivoProceso: true })
      return
    }
    toast.error('No se pudo seleccionar el documento')
  }

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Divider />
        <Box pt={2}>
          <Typography variant='h6'>{title}</Typography>
        </Box>
      </Grid>
      <ButtonsDocSIGEDOC
        handleFileUpload={handleFileUpload}
        disabled={disabled}
        validateBtnDisabled={validateBtnDisabled}
        documentProcessModal={documentProcessModal}
        isProcessFiles={isProcessFiles}
        selectDocOfValueList={selectDocOfValueList}
        idProcess={idProcess}
        arrDoc={arrDoc}
      />
      <Grid
        container
        spacing={2}
        pt={2}
        pb={isPaddingFile ? 0 : 2}
        px={isPaddingFile ? 4 : 2}
      >
        {arrDoc.map((file, index) => (
          <FileShowed
            isPreviewer={false}
            key={index}
            info={file}
            disabled={disabled}
            deleteFile={deleteFile}
          />
        ))}
      </Grid>
      {isDescriptionInput && (
        <Grid
          item
          xs={12}
        >
          <CustomTextField
            item={{
              name: 'descripcion',
              label: 'Descripcion de documentos anexos',
              minRows: 3,
              required: true,
              disabled: disabled,
              type: 'multiline',
            }}
            control={form?.control}
          />
        </Grid>
      )}
    </>
  )
}

export default AttachedDocumentsSIGEDOC
