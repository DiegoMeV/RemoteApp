import { Grid, Typography } from '@mui/material'
import { CardCharts } from '.'
import { dataSummary } from '../../func'
import { optionsCardsSummary, seriesCards } from '../../constants'

const TaskSection = ({ activitiesValues }) => {
  const summaryCards = dataSummary(activitiesValues)
  return (
    <Grid
      container
      spacing={5}
      p='30px'
      justifyContent='center'
    >
      {activitiesValues ? (
        summaryCards?.map((item, index) => (
          <Grid
            item
            key={index}
            xs={12}
            sm={6}
            md={4}
          >
            <CardCharts
              number={item.number}
              title={item.title}
              type='line'
              options={optionsCardsSummary}
              series={seriesCards}
              backgroundColor={item.bgTW}
            />
          </Grid>
        ))
      ) : (
        <Grid item>
          <Typography
            variant='h6'
            pt='10px'
          >
            No existen datos de actividades para mostrar
          </Typography>
        </Grid>
      )}
    </Grid>
  )
}

export default TaskSection
