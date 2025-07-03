import { Button, Grid, MenuItem, TextField } from '@mui/material'

const FiltersSection = () => {
  // const provinces = useQueryDynamicApi({
  //   url: `/common-data/DEPARTAMENTOS`,
  //   baseKey: 'urlApps',
  // })
  // console.log('🚀 ~ FiltersSection ~ provinces:', provinces)

  return (
    <>
      <Grid
        container
        spacing={2}
        sx={{ marginBottom: '20px' }}
      >
        <Grid
          item
          xs={12}
          sm={5}
        >
          <TextField
            select
            fullWidth
            size='small'
            label='Departamentos'
          >
            <MenuItem value='risaralda'>Risaralda</MenuItem>
            {/* Add more departments */}
          </TextField>
        </Grid>
        <Grid
          item
          xs={12}
          sm={5}
        >
          <TextField
            select
            fullWidth
            size='small'
            label='Municipios'
          >
            <MenuItem value='todos'>Todos</MenuItem>
            {/* Add more municipalities */}
          </TextField>
        </Grid>

        <Grid
          item
          xs={12}
          sm={2}
        >
          <Button
            variant='contained'
            fullWidth
            style={{ height: '100%' }}
          >
            BUSCAR
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default FiltersSection
