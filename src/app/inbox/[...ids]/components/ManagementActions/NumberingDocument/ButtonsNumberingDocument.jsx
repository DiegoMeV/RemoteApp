import { ClassicIconButton } from '@/lib'
import { FolderZip, PictureAsPdf } from '@mui/icons-material'
import { Box, Checkbox } from '@mui/material'

const ButtonsNumberingDocument = ({
  selectedDocuments,
  allDocumentsIds,
  handleSelectAll,
  handleDownloadPdf,
  handleDownloadZip,
}) => {
  return (
    <Box
      display='flex'
      justifyContent='space-between'
      margin={0.5}
    >
      <Checkbox
        checked={selectedDocuments?.length === allDocumentsIds?.length}
        onChange={handleSelectAll}
      />
      <Box>
        <ClassicIconButton
          title='Descargar PDF'
          placement={'bottom'}
          onClick={handleDownloadPdf}
        >
          <PictureAsPdf />
        </ClassicIconButton>
        <ClassicIconButton
          title='Descargar ZIP'
          placement={'bottom'}
          onClick={handleDownloadZip}
        >
          <FolderZip />
        </ClassicIconButton>
      </Box>
    </Box>
  )
}

export default ButtonsNumberingDocument
