import { Grid, Radio, Tooltip, Typography } from '@mui/material'
import { Controller } from 'react-hook-form'

const ArticleSection = ({ dataToShow, control }) => {
  return (
    <>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip
          title={
            <Typography variant='body1'>
              <strong>Descripción Artículo 383:</strong> {dataToShow?.texto_art1 ?? ''}
            </Typography>
          }
        >
          <Typography
            variant='body1'
            noWrap='true'
          >
            <strong>Descripción Artículo 383:</strong> {dataToShow?.texto_art1 ?? ''}
          </Typography>
        </Tooltip>
        <Controller
          name='aplica_art1'
          control={control}
          render={({ field }) => {
            const value = field?.value === 'S' ? true : false
            return (
              <Radio
                color='success'
                checked={field?.value === 'S'}
                inputProps={{
                  onClick: () => field?.onChange(value ? 'N' : 'S'),
                }}
              />
            )
          }}
        />
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          alignItems: 'center',
          columnGap: '20px',
          justifyContent: 'space-between',
        }}
      >
        <Tooltip
          title={
            <Typography variant='body1'>
              <strong>Descripción Artículo 384:</strong> {dataToShow?.texto_art3 ?? ''}
            </Typography>
          }
        >
          <Typography
            variant='body1'
            noWrap='true'
          >
            <strong>Descripción Artículo 384:</strong> {dataToShow?.texto_art3 ?? ''}
          </Typography>
        </Tooltip>
        <Controller
          name='aplica_art3'
          control={control}
          render={({ field }) => {
            const value = field?.value === 'S' ? true : false
            return (
              <Radio
                color='error'
                checked={field?.value === 'S'}
                inputProps={{
                  onClick: () => field?.onChange(value ? 'N' : 'S'),
                }}
              />
            )
          }}
        />
      </Grid>
    </>
  )
}

export default ArticleSection
