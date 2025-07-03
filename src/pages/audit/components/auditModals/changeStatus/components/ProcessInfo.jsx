import { MagicString } from '@/lib'
import { Grid, Typography } from '@mui/material'

export const ProcessInfo = ({ infoProcess }) => (
  <>
    <Grid
      item
      xs={3}
    >
      <Typography fontWeight='bold'>Número del proceso :</Typography>
      {infoProcess?.identifier}
    </Grid>
    <Grid
      item
      xs={3}
    >
      <Typography fontWeight='bold'>Tipo de proceso : </Typography>
      {infoProcess?.ProcessType.name}
    </Grid>
    <Grid
      item
      xs={3}
    >
      <Typography fontWeight='bold'>Estado del proceso : </Typography>
      {MagicString.STATUS[infoProcess?.status]}
    </Grid>
  </>
)
