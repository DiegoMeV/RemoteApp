import { Button, Grid } from '@mui/material'

export const SubmitButton = () => (
  <Grid
    item
    xs={12}
    display='flex'
    justifyContent='flex-end'
  >
    <Button
      variant='contained'
      color='primary'
      type='submit'
      sx={{ mt: 2 }}
    >
      Guardar
    </Button>
  </Grid>
)
