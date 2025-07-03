import { Box, Divider, Grid } from '@mui/material'
import { Buttons, Inputs } from './components'

const ContainerForms = ({
  dataBlock,
  isPending,
  isFormReady,
  form,
  modeEditCreate,
  pkValues,
  isEdit,
  blockId,
  isFieldEnabled,
}) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const [nonButtonItems, buttonItems] = dataBlock?.items?.reduce(
    ([nonButtonItems, buttonItems], item) => {
      item.elementType !== 'button' ? nonButtonItems.push(item) : buttonItems.push(item)
      return [nonButtonItems, buttonItems]
    },
    [[], []]
  )

  const propsInputs = {
    nonButtonItems,
    dataBlock,
    form,
    modeEditCreate,
    pkValues,
    isEdit,
    blockId,
    isFieldEnabled,
    buttonItems,
  }

  const propsButtons = { buttonItems, dataBlock, isPending, isFormReady }
  return (
    <Box
      display='flex'
      flexDirection='column'
      p={4}
      sx={{ backgroundColor: '#fff', boxShadow: 2, borderRadius: 4, rowGap: 2, width: '100%' }}
    >
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          xs={12}
          md={buttonItems.length ? 7 : 12}
          lg={buttonItems.length ? 9.5 : 12}
        >
          <Box>
            <Grid
              container
              spacing={2}
            >
              <Inputs {...propsInputs} />
            </Grid>
          </Box>
        </Grid>
        <Grid
          item
          md={1}
          lg={0.5}
          sx={{ display: 'flex', justifyContent: 'center', padding: '0px !important' }}
        >
          {!!buttonItems.length && (
            <Divider
              orientation='vertical'
              variant='middle'
            />
          )}
        </Grid>
        <Grid
          container
          item
          xs={12}
          md={buttonItems.length ? 4 : 0}
          lg={buttonItems.length ? 2 : 0}
          spacing={2}
        >
          {!!buttonItems.length && <Buttons {...propsButtons} />}
        </Grid>
      </Grid>
    </Box>
  )
}

export default ContainerForms
