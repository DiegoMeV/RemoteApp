import { Card, Grid } from '@mui/material'

const ContentLogin = ({ children }) => {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        width: { xs: '90%', md: '80%' },
        height: { xs: '95%', md: '85%' },
        backgroundColor: 'backgroundWhite1',
        minWidth: { xs: '300px', md: '900px' },
        minHeight: { xs: '710px', sm: '457px' },
        maxWidth: '1080px',
        maxHeight: '650px',
      }}
    >
      <Grid
        container
        height='100%'
      >
        {children}
      </Grid>
    </Card>
  )
}

export default ContentLogin
