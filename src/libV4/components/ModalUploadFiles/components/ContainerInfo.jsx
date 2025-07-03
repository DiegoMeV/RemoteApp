import { BoxTitle } from '@/lib'
import { Box, Grid } from '@mui/material'
import React from 'react'

const ContainerInfo = ({ title, children }) => {
  return (
    <>
      <BoxTitle title={title} />
      <Box
        bgcolor='#fff'
        p={2}
        borderRadius='0 0 10px 10px'
      >
        <Grid
          container
          spacing={2}
        >
          {children}
        </Grid>
      </Box>
    </>
  )
}

export default ContainerInfo
