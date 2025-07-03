import { Box, Divider, IconButton } from '@mui/material'
import { ColumnBox } from './ColumnBox'
import { Delete, Download } from '@mui/icons-material'
import styles from './styles/fileStyles.module.css'
import { useStoreActions } from 'easy-peasy'
import { ClassicIconButton } from '@/lib'

export const FileRow = ({ file, onRemove }) => {
  const setPreviewer = useStoreActions((actions) => actions.previewer.setPreviewer)

  return (
    <Box className={styles.rowContainer}>
      <Divider
        orientation='vertical'
        flexItem
      />
      <ColumnBox width='25%'>
        <ClassicIconButton
          onClick={() =>
            setPreviewer({
              open: true,
              idDocument: file?.documentId,
              idVersion: file?.versionDoc,
              nameFile: file?.fileName,
              loadingPreviewer: true,
            })
          }
          title='Descargar'
        >
          <Download />
        </ClassicIconButton>
      </ColumnBox>
      <Divider
        orientation='vertical'
        flexItem
      />
      <ColumnBox width='25%'>
        <IconButton onClick={onRemove}>
          <Delete />
        </IconButton>
      </ColumnBox>
    </Box>
  )
}
