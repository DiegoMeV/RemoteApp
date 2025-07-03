import { Grid, Typography } from '@mui/material'

const CardInfoMesa = ({ info }) => {
  return (
    <>
      {info?.map((item, index) => {
        return (
          <Grid
            item
            xs={6}
            key={index}
          >
            <Grid
              container
              sx={{
                backgroundColor:
                  Math.floor(index / 2) % 2 === 0 ? 'backgroundWhite1' : 'backgroundGrey1',
              }}
              p={2}
            >
              <Grid
                item
                xs={3}
              >
                <Typography fontWeight={'bold'}>{item?.label ?? ''}:</Typography>
              </Grid>
              <Grid
                item
                xs={9}
              >
                <Typography align='justify'>{item?.value ?? ''}</Typography>
              </Grid>
            </Grid>
          </Grid>
        )
      })}
    </>
  )
}

export default CardInfoMesa
