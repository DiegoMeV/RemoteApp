import { BackdropLoading, ClassicIconButton } from '@/lib'
import { ContentPasteGo, Delete, FileUploadOutlined } from '@mui/icons-material'
import { Box, Grid, IconButton, Tooltip } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'
import useAdditional from '../../hooks/useAdditional'

const AdditionalOptions = ({
  idDocument,
  document,
  index,
  ids,
  refecthDocumentsByActivity,
  fileName,
  handleDelete,
}) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)
  const { handleFileUpload, handleCancelDocument, isLoading } = useAdditional({
    idDocument,
    ids,
    refecthDocumentsByActivity,
    fileName,
    document,
  })
  const handleNoName = () => {
    if (!fileName) {
      toast.error('Por favor, coloque un nombre')
      return
    }
  }
  const handlePreview = async () => {
    if (document?.isNew) {
      toast.error('No hay documento a previsualizar')
      return
    }
    setPreviewer({
      open: true,
      idDocument: idDocument,
      loadingPreviewer: true,
    })
  }
  return (
    <Grid
      item
      xs={12}
      sm={6}
      lg={2}
    >
      <BackdropLoading loading={isLoading} />
      <Box
        display='flex'
        justifyContent='flex-end'
      >
        <input
          type='file'
          accept='.pdf,.doc,.docx,.jpg,.jpeg,.png'
          onChange={handleFileUpload}
          style={{ display: 'none' }}
          id={`file-upload-${index}`}
          disabled={!fileName}
        />
        <label htmlFor={`file-upload-${index}`}>
          <Tooltip
            arrow
            title='Cargar documento'
          >
            <IconButton
              color='primary'
              component='span'
              onClick={handleNoName}
            >
              <FileUploadOutlined />
            </IconButton>
          </Tooltip>
        </label>

        <ClassicIconButton
          title={document ? 'Visualizar' : ''}
          disabled={document ? false : true}
          onClick={handlePreview}
        >
          <ContentPasteGo />
        </ClassicIconButton>
        <ClassicIconButton
          title={document ? 'Borrar' : ''}
          color='error'
          disabled={document ? false : true}
          onClick={document?.isNew ? handleDelete : handleCancelDocument}
        >
          <Delete />
        </ClassicIconButton>
      </Box>
    </Grid>
  )
}

export default AdditionalOptions
