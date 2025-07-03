import { Box, Grid } from '@mui/material'

const AbstractContainer = ({ children }) => {
  return (
    <Box
      display='flex'
      borderRadius='5px'
      padding='10px'
      bgcolor='backgroundWhite1'
    >
      <Grid
        container
        justifyContent='space-around'
        alignItems='space-around'
        spacing={1}
      >
        {children}
      </Grid>
    </Box>
  )
}

export default AbstractContainer
