import { Box, Grid, Typography } from '@mui/material'

import { socialMedia } from '../../constants'

const SocialMedia = () => {
  // TODO : const theme = useTheme()
  // TODO : const bgColorPrimary = lighten(theme.palette.primary.main, 0.6)
  return (
    <Box
      sx={{
        p: 5,
        // TODO : bgcolor: bgColorPrimary,
      }}
    >
      <Grid
        container
        spacing={2}
        mb={2}
      >
        <Grid
          item
          container
          xs={12}
          md={8}
          spacing={1}
        >
          {socialMedia.map((item, index) => {
            return (
              <Grid
                key={index}
                item
                xs={6}
                md={item?.md ?? 6}
                sx={{
                  display: 'flex',
                  justifyContent: {
                    xs: 'flex-start',
                  },
                  alignItems: 'center',
                  gap: 1,
                  cursor: 'pointer',
                  borderRadius: 1,
                  '&:hover': {
                    color: '#1a73e8',
                  },
                }}
                onClick={() => {
                  if (item.url) {
                    window.open(item.url, '_blank')
                  }
                }}
              >
                {item.logo && (
                  <img
                    src={item.logo}
                    alt={item.label}
                    width={30}
                    height={30}
                  />
                )}
                <Typography noWrap>{item?.label ?? ''}</Typography>
              </Grid>
            )
          })}
        </Grid>
        <Grid
          item
          xs={6}
          md={2}
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              md: 'center',
            },
          }}
        >
          <img
            src='/assets/svg/logMinTic.svg'
            alt='Agencia Nacional Digital Logo'
            width={69}
            height={124}
          />
        </Grid>
        <Grid
          item
          xs={6}
          md={2}
          sx={{
            display: 'flex',
            justifyContent: {
              xs: 'center',
              md: 'center',
            },
          }}
        >
          <img
            src='/assets/svg/logoAND.svg'
            alt='Agencia Nacional Digital Logo'
            width={168}
            height={125}
          />
        </Grid>
      </Grid>
    </Box>
  )
}

export default SocialMedia
