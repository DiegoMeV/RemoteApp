import { ClassicIconButton, GenericTextfield } from '@/lib'
import { Check, CloseOutlined, ContentPasteGo } from '@mui/icons-material'
import { Box, Grid } from '@mui/material'
import { useState } from 'react'
import { documentStatus } from '../constants'
import { getIdsDocumentToReview, newDocumentUpdate } from '../funcs'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'

const OptionsReview = ({
  elementActionLocal,
  idActivityAction,
  idGoToTask,
  currentState,
  disabledReview,
  reviewDocument,
}) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const { idDocument, idVersion } = getIdsDocumentToReview(elementActionLocal)

  const idUser = useStoreState((state) => state.user.userData)?.id

  const findComment = elementActionLocal?.documentToBeHandledData?.Comments?.find((commentInfo) => {
    return commentInfo.byUser === idUser
  })

  const [comment, setComment] = useState(
    elementActionLocal?.activityActionItemData?.commentData?.comentario ??
      findComment?.comment ??
      ''
  )

  const onChangeComment = (e) => {
    setComment(e.target.value)
  }

  const reviewFunc = async (state) => {
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
            disabled={disabledReview}
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
          <ClassicIconButton
            title='Aprobar'
            disabled={disabledReview}
            onClick={() => {
              if (currentState === documentStatus.approved) {
                toast.error('El documento ya ha sido aprobado')
                return
              }
              reviewFunc(documentStatus.approved)
            }}
            color='success'
            // Todo: for the moment disabled={!!findComment}
          >
            <Check />
          </ClassicIconButton>
          <ClassicIconButton
            title='Rechazar'
            onClick={() =>
              reviewFunc(idGoToTask ? documentStatus.rejectedToTask : documentStatus.rejected)
            }
            color='error'
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
            elementActionLocal?.activityActionItemData?.commentData?.codigoSeguridad ??
            findComment?.securityCode ??
            ''
          }`}
          value={comment}
          onChange={onChangeComment}
          multiline
          minRows={3}
          maxRows={3}
          InputLabelProps={{ shrink: true }}
          //Todo: for the moment disabled={!!findComment}
        />
      </Grid>
    </>
  )
}

export default OptionsReview
