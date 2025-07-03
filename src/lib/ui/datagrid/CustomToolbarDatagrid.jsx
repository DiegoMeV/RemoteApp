import { AccessControl } from '@/libV4'
import { Box, Button, Grid, Tooltip } from '@mui/material'
import {
  GridToolbarColumnsButton,
  GridToolbarDensitySelector,
  GridToolbarExport,
  GridToolbarFilterButton,
} from '@mui/x-data-grid-premium'

const CustomToolbarDatagrid = ({ otherOptions, buttons }) => {
  return (
    <Grid
      container
      alignItems='center'
      justifyContent={otherOptions ? 'space-between' : 'flex-end'}
      p='10px'
    >
      <Grid
        item
        xs={12}
        md={7}
      >
        {otherOptions}
      </Grid>
      <Box display={'flex'}>
        {buttons?.map((button, index) => {
          return (
            <Box key={index}>
              {button.privilege ? (
                <AccessControl privilege={button?.privilege}>
                  <Tooltip title={button?.title}>
                    <Button
                      size='small'
                      startIcon={button?.icon}
                      disabled={button?.disabled ?? false}
                      onClick={button?.onClick}
                      sx={{ fontSize: { xs: 0, xl: 12 } }}
                    >
                      {button?.title}
                    </Button>
                  </Tooltip>
                </AccessControl>
              ) : (
                <Tooltip title={button?.title}>
                  <Button
                    size='small'
                    startIcon={button?.icon}
                    disabled={button?.disabled ?? false}
                    onClick={button?.onClick}
                    sx={{ fontSize: { xs: 0, xl: 12 } }}
                  >
                    {button?.title}
                  </Button>
                </Tooltip>
              )}
            </Box>
          )
        })}
        <Tooltip title='Columnas'>
          <GridToolbarColumnsButton sx={{ fontSize: { xs: 0, xl: 12 } }} />
        </Tooltip>
        <GridToolbarFilterButton sx={{ fontSize: { xs: 0, xl: 12 } }} />
        <Tooltip title='Espaciado'>
          <GridToolbarDensitySelector sx={{ fontSize: { xs: 0, xl: 12 } }} />
        </Tooltip>
        <Tooltip title='Exportar'>
          <GridToolbarExport sx={{ fontSize: { xs: 0, xl: 12 } }} />
        </Tooltip>
      </Box>
    </Grid>
  )
}

export default CustomToolbarDatagrid
