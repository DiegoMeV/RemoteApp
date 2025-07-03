import { ClassicIconButton, GenericTextfield } from '@/lib'
import { Check, CloseOutlined, ContentPasteGo } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import { documentStatus } from '../constants'
import { getIdsDocumentToReview, newDocumentUpdate } from '../funcs'
import { useStoreActions } from 'easy-peasy'
import toast from 'react-hot-toast'

const OptionsSignature = ({
  elementActionLocal,
  idActivityAction,
  currentState,
  disabledReview,
  reviewDocument,
}) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { idDocument } = getIdsDocumentToReview(elementActionLocal)

  const [comment, setComment] = useState(
    elementActionLocal?.activityActionItemData?.commentData?.comentario ?? ''
  )

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const reviewDoc = async (state) => {
    if (state === documentStatus.rejected && (!comment || comment.trim() === '')) {
      toast.error('Debe ingresar un comentario')
      return
    }

    const idActivityActionItem = elementActionLocal?.activityActionItemData?.id
    const body = newDocumentUpdate(elementActionLocal, comment, state, idActivityActionItem)

    reviewDocument({
      body,
      qry: idActivityAction ? `/${idActivityAction}/items/comment-doc/${idDocument}` : '',
    })
  }

  return (
    <>
      <Grid
        item
        xs={12}
        justifyContent='flex-end'
      >
        <Box
          display='flex'
          justifyContent='flex-end'
        >
          <ClassicIconButton
            title='Visualizar'
            onClick={async () => {
              setPreviewer({
                open: true,
                idDocument: idDocument,
                loadingPreviewer: true,
              })
            }}
            color='secondary'
          >
            <ContentPasteGo />
          </ClassicIconButton>
          <ClassicIconButton
            title='Firmar'
            disabled={disabledReview}
            color='success'
            onClick={() => {
              if (currentState === documentStatus.signed) {
                toast.error('El documento ya ha sido firmado')
                return
              }
              reviewDoc(documentStatus.signed)
            }}
          >
            <Check />
          </ClassicIconButton>
          <ClassicIconButton
            title='Rechazar'
            disabled={disabledReview}
            color='error'
            onClick={() => reviewDoc(documentStatus.rejected)}
          >
            <CloseOutlined />
          </ClassicIconButton>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
      >
        <GenericTextfield
          size='small'
          label='Comentario'
          helperText={`Código de seguridad : ${
            elementActionLocal?.activityActionItemData?.commentData?.codigoSeguridad ?? ''
          }`}
          value={comment}
          onChange={onChangeComment}
          multiline
          minRows={3}
          maxRows={3}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
    </>
  )
}

export default OptionsSignature
