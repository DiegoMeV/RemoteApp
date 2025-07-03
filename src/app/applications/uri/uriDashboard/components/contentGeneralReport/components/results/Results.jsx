import { Grid } from '@mui/material'
import { ActiveAct, CardsInfo, MonitoringByRegion, SectorPie } from './components'

const Results = (props) => {
  return (
    <>
      <Grid
        container
        spacing={2}
      >
        <Grid
          item
          sm={12}
        >
          <CardsInfo qryParams={props.qryParams} />
        </Grid>
        <Grid
          item
          lg={6}
          sm={12}
        >
          <ActiveAct
            qryParams={props.qryParams}
            {...props.activeAct}
          />
        </Grid>

        <Grid
          item
          lg={6}
          sm={12}
        >
          <SectorPie
            qryParams={props.qryParams}
            {...props.sector}
          />
        </Grid>
        <Grid
          item
          sm={12}
        >
          <MonitoringByRegion
            qryParams={props.qryParams}
            {...props.monitoringByRegion}
          />
        </Grid>
      </Grid>
    </>
  )
}

export default Results
