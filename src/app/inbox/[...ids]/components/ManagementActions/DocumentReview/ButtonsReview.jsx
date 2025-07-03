import { ClassicIconButton } from '@/lib'
import { FolderZip, PictureAsPdf } from '@mui/icons-material'
import { Button, Checkbox, Grid } from '@mui/material'

const ButtonsReview = ({
  selectedDocuments,
  allDocumentsIds,
  handleSelectAll,
  handleDownloadPdf,
  handleDownloadZip,
  idGoToTask,
  commentModal,
  setStateToSend,
  // TODO: activityInfo,
}) => {
  // TODO : const existComment =
  //   activityInfo?.[0]?.activityData?.approvedData?.comment ||
  //   activityInfo?.[0]?.activityData?.rejectedData?.comment ||
  //   activityInfo?.[0]?.activityData?.askForDocs?.comment

  const changeState = (state) => {
    setStateToSend(state)
    commentModal?.handleShow()
  }
  return (
    <Grid
      container
      py={1}
      spacing={2}
      justifyContent='space-between'
      alignItems='center'
    >
      <Grid
        item
        xs={1}
      >
        <Checkbox
          checked={selectedDocuments?.length === allDocumentsIds?.length}
          onChange={handleSelectAll}
        />
      </Grid>
      <Grid
        item
        xs={11}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          columnGap: '10px',
        }}
      >
        {!!idGoToTask && (
          <>
            <Button
              variant='contained'
              color='success'
              onClick={() => changeState('approvedData')}
              // TODO : disabled={existComment}
            >
              Aprobar
            </Button>

            <Button
              variant='contained'
              onClick={() => changeState('askForDocs')}
              // TODO : disabled={existComment}
            >
              Solicitar documentos
            </Button>
            <Button
              variant='contained'
              color='error'
              onClick={() => changeState('rejectedData')}
              // TODO : disabled={existComment}
            >
              Rechazar
            </Button>
          </>
        )}
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
      </Grid>
    </Grid>
  )
}

export default ButtonsReview
