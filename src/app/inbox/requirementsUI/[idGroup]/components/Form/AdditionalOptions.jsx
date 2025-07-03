import {
  AdditionalDocumentButton,
  BackdropLoading,
  ClassicIconButton,
  useAdditionalDocument,
} from '@/lib'
import { ContentPasteGo, Delete } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const AdditionalOptions = ({
  idDocument,
  document,
  index,
  ids,
  refecthDocumentsByActivity,
  refetchSourceProcess,
  fileName,
  handleDelete,
}) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { handleFileUpload, handleCancelDocument, isLoading } = useAdditionalDocument({
    idDocument,
    ids,
    refecthDocumentsByActivity,
    fileName,
    document,
    refetchSourceProcess,
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
      sm={3}
      lg={2}
    >
      <BackdropLoading loading={isLoading} />
      <Box
        display='flex'
        justifyContent='flex-end'
      >
        <AdditionalDocumentButton
          handleFileUpload={handleFileUpload}
          index={index}
          handleNoName={handleNoName}
          fileName={fileName}
        />
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
