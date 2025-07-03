import { useStoreState } from 'easy-peasy'
import { Skeleton } from '@mui/material'

import { ChartContainer, FilterDashboard } from '@/libV4'
import { ChartDynamic } from '@/lib'

import { useManagementFiles } from './hooks'
import { indicatorsFiles } from './hooks/funcs'
import { inputsFilters } from './constants'
import { TableManagementFile } from './components'

const ManagementFile = () => {
  const dark = useStoreState((state) => state.darkTheme.dark)

  const [stateVars, stateFuncsVars] = useManagementFiles()

  const { form, infoCharts, loading, queryParams } = stateVars

  const { onSubmit } = stateFuncsVars

  const inputs = inputsFilters({}) ?? []

  const indicatorsFile = indicatorsFiles({ infoCharts, dark })

  return (
    <section className='general_form_container rounded-lg shadow-lg backgroundGray1 p-4 h-100% overflow-auto'>
      <FilterDashboard
        title='Filtros de expedientes'
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
        <TableManagementFile queryParams={queryParams} />
      </section>
    </section>
  )
}

export default ManagementFile
