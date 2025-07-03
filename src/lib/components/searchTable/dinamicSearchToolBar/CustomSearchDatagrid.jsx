import { Button, Grid } from '@mui/material'
import { GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid-premium'
import { searchDatagrid, toolbarContainer } from './stylesSx'

const CustomSearchDatagrid = ({
  buttonLabel,
  onClick,
  disabledButton,
  buttonLabel2,
  onClick2,
  buttonAccess = true,
  loadingInfo,
  noSearch,
}) => {
  return (
    <GridToolbarContainer sx={toolbarContainer}>
      <Grid
        container
        spacing={2}
        alignItems='center'
      >
        {!noSearch && (
          <Grid
            item
            xs={buttonLabel2 ? 6 : 9}
          >
            <GridToolbarQuickFilter
              variant='outlined'
              size='small'
              sx={searchDatagrid}
            />
          </Grid>
        )}

        {buttonLabel && buttonAccess && (
          <Grid
            item
            xs={3}
          >
            <Button
              variant='contained'
              onClick={onClick}
              disabled={loadingInfo || (disabledButton ?? false)}
              fullWidth
            >
              {buttonLabel}
            </Button>
          </Grid>
        )}
        {buttonLabel2 && (
          <Grid
            item
            xs={3}
          >
            <Button
              variant='contained'
              onClick={onClick2}
              disabled={loadingInfo || (disabledButton ?? false)}
              fullWidth
            >
              {buttonLabel2}
            </Button>
          </Grid>
        )}
      </Grid>
    </GridToolbarContainer>
  )
}

export default CustomSearchDatagrid
