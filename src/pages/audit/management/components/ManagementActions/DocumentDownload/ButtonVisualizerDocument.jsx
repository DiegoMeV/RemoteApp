import { ClassicIconButton } from '@/lib'
import { ContentPasteGo } from '@mui/icons-material'
import { Box } from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const ButtonVisualizerDocument = ({ idDocument, idVersion }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  return (
    <Box
      display='flex'
      width='100%'
      justifyContent='space-evenly'
      alignItems='center'
    >
      <ClassicIconButton
        title='Visualizar'
        onClick={async () => {
          setPreviewer({
            open: true,
            idDocument: idDocument,
            idVersion: idVersion,
            loadingPreviewer: true,
          })
        }}
        color='secondary'
      >
        <ContentPasteGo />
      </ClassicIconButton>
    </Box>
  )
}

export default ButtonVisualizerDocument
