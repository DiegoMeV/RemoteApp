import { Grid, Typography } from '@mui/material'

const CustomOptionUserByJt = ({ option }) => {
  return (
    <Grid
      container
      borderBottom='1px solid #E7E7E7'
    >
      <Grid
        item
        xs={4}
      >
        <Typography variant='body1'>
          {option.firstName} {option.lastName || ''}
        </Typography>
      </Grid>
      <Grid
        item
        xs={4}
      >
        <Typography variant='body1'>{option?.jobTitles?.name}</Typography>
      </Grid>

      <Grid
        item
        xs={4}
      >
        <Typography variant='body1'> {option?.jobTitles?.depencyName}</Typography>
      </Grid>
    </Grid>
  )
}

export default CustomOptionUserByJt
