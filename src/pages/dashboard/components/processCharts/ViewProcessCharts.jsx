import { useProcessCharts } from './hooks'
import { ProcessCharts } from './components'

const ViewProcessCharts = () => {
  const [stateVars, stateFuncsVars] = useProcessCharts()

  return (
    <article className='h-full'>
      <ProcessCharts
        stateVars={stateVars}
        stateFuncsVars={stateFuncsVars}
      />
    </article>
  )
}

export default ViewProcessCharts
