import { Grid, Typography } from '@mui/material'

const CustomOptionUserSigedoc = ({ option }) => {
  return (
    <Grid
      container
      borderBottom='1px solid #E7E7E7'
    >
      <Grid
        item
        xs={6}
      >
        <Typography variant='body1'>
          {option.firstName} {option.lastName || ''}
        </Typography>
      </Grid>
      <Grid
        item
        xs={6}
      >
        <Typography variant='body1'>{option?.email}</Typography>
      </Grid>
    </Grid>
  )
}

export default CustomOptionUserSigedoc
