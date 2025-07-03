import { Launch } from '@mui/icons-material'
import { Card, CardContent, Grid, Typography } from '@mui/material'

const CallApiElement = ({ callAPIURL, downloadByURL }) => {
  return (
    <>
      {callAPIURL && (
        <Grid
          item
          xs={12}
          sm={6}
          md={3}
        >
          {/* TODO : <Tooltip
        title={
          <Typography
            sx={{
              display: '-webkit-box',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 4,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {callAPIURL}
          </Typography>
        }
      > */}
          <Card
            onClick={() => downloadByURL({ qry: callAPIURL })}
            sx={{
              cursor: 'pointer',
              transition: '0.3s',
              '&:hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.1)',
                boxShadow: 6,
              },
            }}
          >
            <CardContent>
              <Grid
                container
                flexDirection={'column'}
                spacing={2}
              >
                <Grid
                  item
                  xs={12}
                  container
                  flexDirection={'row'}
                  justifyContent='space-around'
                >
                  <Launch
                    color='primary'
                    sx={{
                      fontSize: 50,
                    }}
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                >
                  <Typography
                    fontWeight='bold'
                    textAlign='center'
                    fontSize={18}
                  >
                    Descargar
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
          {/* </Tooltip> */}
        </Grid>
      )}
    </>
  )
}

export default CallApiElement
