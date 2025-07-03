import { Divider, Grid, Typography } from '@mui/material'
import React from 'react'

const headers = ['Título', 'Descripción', 'Valor']

const HeaderBlockVars = () => {
  return (
    <Grid container>
      {headers.map((header, index) => (
        <React.Fragment key={index}>
          <Grid
            item
            md={3.9}
            display='flex'
            justifyContent='center'
          >
            <Typography
              variant='h6'
              textAlign='center'
              fontWeight='bold'
              p={1}
            >
              {header}
            </Typography>
          </Grid>
          <Divider
            orientation='vertical'
            flexItem
          />
        </React.Fragment>
      ))}
    </Grid>
  )
}

export default HeaderBlockVars
