import { ClassicIconButton } from '@/lib'
import { Cancel, Description } from '@mui/icons-material'
import { Box, Grid, Typography } from '@mui/material'
import { useStoreActions } from 'easy-peasy'

const FileShowed = ({ info, deleteFile, isPreviewer = true, disabled = false }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  const handlePreviewFile = () => {
    if (isPreviewer) {
      setPreviewer({
        open: true,
        idDocument: info?.id,
        nameFile: info?.name,
        loadingPreviewer: true,
      })
    }
  }

  const handleDeleteFile = (e) => {
    e.stopPropagation()
    deleteFile(info.id)
  }

  return (
    <Grid
      item
      xs={12}
      sm={4}
      md={3}
    >
      <Box
        component='section'
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: 'backgroundGrey2',
          borderRadius: 1,
          p: 1,
          columnGap: 1,
          cursor: isPreviewer ? 'pointer' : 'default',
        }}
        onClick={handlePreviewFile}
      >
        <Description color='info' />
        <Typography noWrap={true}>{info?.name ?? ''}</Typography>
        <ClassicIconButton
          color='secondary'
          disabled={disabled}
          onClick={handleDeleteFile}
        >
          <Cancel />
        </ClassicIconButton>
      </Box>
    </Grid>
  )
}

export default FileShowed
