import {
  Box,
  CircularProgress,
  Grid,
  IconButton,
  ListItem,
  ListItemText,
  Slide,
} from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { containerListItems, ListItemTextSx } from '../../styles'
import { Close } from '@mui/icons-material'
import { CustomAccordion, MagicString, useGetProcess } from '@/lib'
import { ItemsByAction } from './Actions'

const InfoByActions = ({ idProcess, setBoxType, boxType, docs }) => {
  const idActivity = docs?.id

  const {
    data: infoActionsByActivity,
    isLoading: loadingInfoActions,
    isError: errorInfoActions,
    isFetching: fetchingInfoActions,
  } = useGetProcess({
    qry: `/${idProcess}/activities/${idActivity}/actions?inclActionItems=true&inclTaskAction=true`,
  })

  const actionsToPerform = infoActionsByActivity?.data?.sort((a, b) => a?.position - b?.position)

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
            primary='Información de la actividad'
            secondary={docs?.Task.name}
          />
          <IconButton
            size='small'
            color='primary'
            onClick={handleShowBox}
          >
            <Close />
          </IconButton>
        </ListItem>
        <Box size='small'>
          {loadingInfoActions && fetchingInfoActions ? (
            <Box
              display='flex'
              justifyContent='center'
              alignItems='center'
            >
              <CircularProgress />
            </Box>
          ) : errorInfoActions ? (
            MagicString.DOCS.ERROR_MESSAGE
          ) : actionsToPerform?.length > 0 ? (
            <Box
              height='calc(100vh - 365px)'
              maxHeight='calc(100vh - 365px)'
              overflow='auto'
            >
              {actionsToPerform?.map((action, index) => {
                return (
                  <CustomAccordion
                    key={index}
                    title={action?.TaskAction?.shortName ?? action?.TaskAction?.name ?? ''}
                  >
                    <ItemsByAction
                      actionItems={action?.ActionItems ?? []}
                      TaskAction={action?.TaskAction}
                    />
                  </CustomAccordion>
                )
              })}{' '}
            </Box>
          ) : (
            <>No hay información disponible para esta acción</>
          )}
        </Box>
      </Grid>
    </Slide>
  ) : null
}
export default InfoByActions
