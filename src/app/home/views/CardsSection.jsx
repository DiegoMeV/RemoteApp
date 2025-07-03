import { Box, Button, Card, CardContent, Grid, lighten, Typography } from '@mui/material'

const CardsSection = ({ companies }) => {
  const bgColorPrimary = (theme) => lighten(theme.palette.primary.main, 0.8)
  return (
    <Box sx={{ bgcolor: bgColorPrimary, p: 2 }}>
      <Grid
        container
        spacing={2}
        pb={2}
      >
        <Grid
          item
          xs={12}
        >
          <Typography
            color='primary'
            fontSize={36}
            textAlign='center'
          >
            Aplicaciones de Gestión Estatal
          </Typography>
        </Grid>
        {companies?.map((item) => {
          return (
            <Grid
              item
              xs={12}
              sm={12}
              md={6}
              lg={4}
              key={item}
            >
              <Card sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                  <CardContent
                    display='flex'
                    flexDirection='row'
                  >
                    <Box
                      display='flex'
                      flexDirection='column'
                      width='100%'
                      rowGap={2}
                      justifyContent='center'
                    >
                      <Typography
                        variant='h6'
                        fontWeight='bold'
                        gutterBottom
                        color='primary'
                        textAlign='center'
                      >
                        {item?.companyName ?? ''}
                      </Typography>
                      <Button
                        variant='outlined'
                        fullWidth
                        sx={{
                          marginBottom: '10px',
                          borderRadius: 4,
                          backgroundColor: bgColorPrimary,
                          border: 'none',
                          textAlign: 'center',
                        }}
                        href={`https://app.siifweb.com:9100/siifweb/index.jsp?nc=${
                          item?.taxId ?? ''
                        }`}
                      >
                        MÓDULO FINANCIERO
                      </Button>
                      <Button
                        variant='outlined'
                        fullWidth
                        sx={{
                          borderRadius: 4,
                          backgroundColor: bgColorPrimary,
                          border: 'none',
                          textAlign: 'center',
                        }}
                        href={`https://mintic.siifweb.com/?idCompany=${item?.id ?? ''}`}
                      >
                        MÓDULO GESTIÓN DOCUMENTAL
                      </Button>
                    </Box>
                  </CardContent>
                </Box>
                <div
                  style={{
                    padding: '10px',
                  }}
                >
                  <img
                    src={item?.urlLogo ?? ''}
                    alt='Logo-Empresa'
                    style={{
                      maxWidth: '110px',
                      height: 'auto',
                    }}
                  />
                </div>
              </Card>
            </Grid>
          )
        })}
      </Grid>
    </Box>
  )
}

export default CardsSection
