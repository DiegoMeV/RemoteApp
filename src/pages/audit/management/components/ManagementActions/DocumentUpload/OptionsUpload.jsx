import { ClassicIconButton } from '@/lib'
import { ContentPasteGo, Delete, FileUploadOutlined } from '@mui/icons-material'
import { Box, Grid, IconButton, TextField, Tooltip } from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const OptionsUpload = ({ index, elementActionLocal, handleFileUpload, handleCancelDocument }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const documentExist = elementActionLocal?.activityActionItemData?.documentVersionData
    ? true
    : false

  return (
    <Grid
      item
      xs={12}
      sm={6}
      lg={2}
    >
      <Box
        display='flex'
        justifyContent='flex-end'
      >
        <TextField
          id={`${index}`}
          type='file'
          inputProps={{ accept: import.meta.env.ACCEPTED_FILE_TYPE }}
          sx={{ display: 'none' }}
          onChange={handleFileUpload}
          disabled={documentExist}
        />
        <label htmlFor={`${index}`}>
          <Tooltip
            arrow
            title='Cargar documento'
          >
            <IconButton
              color='primary'
              component='span'
              disabled={documentExist}
            >
              <FileUploadOutlined />
            </IconButton>
          </Tooltip>
        </label>

        <ClassicIconButton
          title={documentExist ? 'Visualizar' : ''}
          disabled={!documentExist}
          onClick={async () => {
            setPreviewer({
              open: true,
              idDocument:
                elementActionLocal?.activityActionItemData?.documentVersionData?.idDocument,
              idVersion: elementActionLocal?.activityActionItemData?.documentVersionData?.id,
              loadingPreviewer: true,
            })
          }}
        >
          <ContentPasteGo />
        </ClassicIconButton>
        <ClassicIconButton
          title={documentExist ? 'Borrar' : ''}
          color='error'
          disabled={!documentExist}
          onClick={handleCancelDocument}
        >
          <Delete />
        </ClassicIconButton>
      </Box>
    </Grid>
  )
}

export default OptionsUpload
