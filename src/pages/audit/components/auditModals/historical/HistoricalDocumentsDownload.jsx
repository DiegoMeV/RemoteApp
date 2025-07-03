import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Slide,
} from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { useStoreState } from 'easy-peasy'
import DocumentItem from './DocumentItem'
import { ListItemTextSx, containerListItems } from './styles'
import { MagicString } from '@/lib'
import { useQueryDynamicApi } from '@/libV4'

const HistoricalDocumentsDownload = ({ setBoxType, boxType, docs }) => {
  const {
    data: infoDocuments,
    isFetching: isLoading,
    isError,
  } = useQueryDynamicApi({
    baseKey: 'urlFiscalizacion',
    url: `/processes/${docs?.idProcess}/activities/${docs?.id}/docs`,
  })

  const dark = useStoreState((state) => state.darkTheme.dark)

  const handleShowBox = () => {
    setBoxType()
  }

  return boxType ? (
    <Slide
      direction='left'
      in={!!boxType}
      timeout={500}
    >
      <Grid
        item
        sx={containerListItems(dark)}
      >
        <ListItem sx={ListItemTextSx}>
          <ListItemText
            size='small'
            color='fontIcon'
            primary='Documentos'
            secondary={docs?.Task.name}
          />
          <IconButton
            size='small'
            color='primary'
            onClick={handleShowBox}
          >
            <CloseIcon />
          </IconButton>
        </ListItem>
        <Box
          size='small'
          bgcolor='backgroundWhite1'
        >
          {isLoading ? (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <CircularProgress />
            </Box>
          ) : isError ? (
            MagicString.DOCS.ERROR_MESSAGE
          ) : infoDocuments?.data?.length > 0 ? (
            infoDocuments?.data?.map((documentInfo, index) => (
              <DocumentItem
                key={index}
                documentInfo={documentInfo}
                isLoading={isLoading}
              />
            ))
          ) : (
            <>No hay documentos para esta actividad</>
          )}
        </Box>
      </Grid>
    </Slide>
  ) : null
}
export { HistoricalDocumentsDownload }
