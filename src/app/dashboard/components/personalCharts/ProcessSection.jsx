import { Grid } from '@mui/material'
import { useStoreState } from 'easy-peasy'
import { arrayProcecessInfo } from '../../func'
import { ChartContainer, ChartDynamic } from '@/lib'

const ProcessSection = ({ processesStatus, processesByMonth }) => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  const arrayChart = arrayProcecessInfo(processesStatus, processesByMonth, dark)

  return (
    <>
      {processesStatus &&
        processesByMonth &&
        arrayChart?.map((chart, index) => {
          return (
            <Grid
              key={index}
              item
              xs={12}
              md={chart.size}
            >
              <ChartContainer title={chart.title}>
                <ChartDynamic
                  options={chart.options}
                  series={chart.series}
                  type='bar'
                />
              </ChartContainer>
            </Grid>
          )
        })}
    </>
  )
}

export default ProcessSection
