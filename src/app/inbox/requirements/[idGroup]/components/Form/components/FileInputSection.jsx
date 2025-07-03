import { Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { FileUploadOutlined } from '@mui/icons-material'
import { CustomTextField } from '@/lib'

const FileInputSection = ({
  uploadDoc,
  item,
  textInputType,
  index,
  control,
  watch,
  processIdentifier,
  canWrite = false,
}) => {
  const handleFileUpload = async (event, nombreMostrar, descripcion) => {
    const File = new FormData()

    File.append('file', event.target.files[0])
    File.append('idProceso', processIdentifier?.data?.id)
    File.append('nombreMostrar', nombreMostrar)
    File.append('descripcion', descripcion)

    await uploadDoc(File)
  }

  const nameItemFile = textInputType(
    `files.${index}.nombreMostrar`,
    'Nombre para mostrar archivo',
    canWrite,
    'text',
    true
  )

  const descripcionItemFile = textInputType(
    `files.${index}.descripcion`,
    'Descripción para archivo',
    canWrite,
    'text',
    false
  )

  const nameFileItemFile = textInputType(
    `files.${index}.nameFile`,
    'Nombre del archivo',
    true,
    'text',
    false
  )

  const nombreMostrar = watch(`files.${index}.nombreMostrar`)
  const descripcion = watch(`files.${index}.descripcion`)

  return (
    <Grid
      container
      gap={1}
      flex={1}
    >
      <Grid
        item
        xs={3.6}
        md={3.6}
      >
        <CustomTextField
          item={nameItemFile}
          control={control}
        />
      </Grid>
      <Grid
        item
        xs={3.6}
        md={3.6}
      >
        <CustomTextField
          item={descripcionItemFile}
          control={control}
        />
      </Grid>
      <Grid
        item
        xs={3.6}
        md={3.6}
      >
        <CustomTextField
          item={nameFileItemFile}
          control={control}
        />
      </Grid>
      <Grid
        item
        xs={0.7}
        md={0.7}
      >
        <TextField
          id={`${item.id}`}
          onChange={(ev) => handleFileUpload(ev, nombreMostrar, descripcion)}
          type='file'
          fullWidth
          size='small'
          disabled={!nombreMostrar}
          inputProps={{ accept: import.meta.env.ACCEPTED_FILE_TYPE }}
          sx={{ display: 'none' }}
        />
        <label htmlFor={`${item.id}`}>
          <Tooltip
            arrow
            disabled={!nombreMostrar}
            title='Cargar documento'
          >
            <IconButton
              disabled={!nombreMostrar}
              color='primary'
              component='span'
            >
              <FileUploadOutlined />
            </IconButton>
          </Tooltip>
        </label>
      </Grid>
    </Grid>
  )
}

export default FileInputSection
