import { useStoreState } from 'easy-peasy'
import { Skeleton } from '@mui/material'

import { ChartContainer, ChartDynamic, FilterDashboard } from '@/libV4'

import { TableProcessResults } from '.'
import { inputsFilters } from '../constanst'
import { indicatorsFiles } from '../funcs'

const ProcessCharts = ({ stateVars = {}, stateFuncsVars = {} } = {}) => {
  const dark = useStoreState((state) => state.darkTheme.dark)
  const { form, infoCharts, loading, queryParams } = stateVars

  const { onSubmit } = stateFuncsVars

  const inputs = inputsFilters({}) ?? []

  const indicatorsFile = indicatorsFiles({ infoCharts, dark })

  return (
    <div className='general_form_container rounded-lg shadow-lg backgroundGray1 p-4 h-100% overflow-auto'>
      <FilterDashboard
        title='Filtros de procesos'
        form={form}
        inputs={inputs}
        onSubmit={onSubmit}
      />
      {indicatorsFile?.map((indicator, index) => (
        <div
          key={index}
          className={indicator?.className ?? ''}
        >
          <ChartContainer title={indicator?.title}>
            {loading[index] ? (
              <Skeleton
                variant='rectangular'
                height={450}
              />
            ) : (
              (indicator?.options || indicator?.series) && (
                <ChartDynamic
                  indicator={indicator}
                  options={indicator?.options}
                  series={indicator?.series}
                  type={indicator?.type ?? ''}
                  height={indicator?.height}
                  justifyContent='center'
                />
              )
            )}
          </ChartContainer>
        </div>
      ))}
      <section className='col-span-12 general_form_container'>
        <TableProcessResults queryParams={queryParams} />
      </section>
    </div>
  )
}

export default ProcessCharts
