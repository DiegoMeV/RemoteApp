import { Divider, Grid, Typography } from '@mui/material'
import { basicDataItem } from '../styles'

const ItemQrData = ({ data }) => {
  return (
    <Grid
      container
      sx={basicDataItem}
    >
      <Grid
        item
        xs={6}
        sm={4}
      >
        <Typography variant='body1'>{data.label}</Typography>
      </Grid>
      <Grid
        item
        xs={6}
        sm={8}
      >
        <Typography
          variant='body1'
          color='secondary'
        >
          {data.value}
        </Typography>
      </Grid>
      <Divider />
    </Grid>
  )
}

export default ItemQrData
