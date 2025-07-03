import { Box, Divider, Grid, Typography } from '@mui/material'

const Section = ({ title, rows }) => (
  <Box mb={2}>
    <Divider />
    <Typography
      variant='h4'
      textAlign='center'
      m={2}
    >
      {title}
    </Typography>
    <Divider />
    <Grid
      p={2}
      container
      spacing={2}
    >
      {rows.map((row, index) => (
        <Grid
          item
          container
          xs={12}
          sm={6}
          key={index}
        >
          <Grid
            item
            xs={6}
          >
            <Typography
              variant='subtitle1'
              fontWeight='bold'
            >
              {row.label}
            </Typography>
          </Grid>
          <Grid
            item
            xs={6}
          >
            <Typography variant='subtitle1'>{row.value}</Typography>
          </Grid>
        </Grid>
      ))}
    </Grid>
  </Box>
)

export default Section
