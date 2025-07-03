import AccordionDisplay from '../../AccordionDisplay'
import { accordionsGraphs } from '../funcs'

const GraphsDisplay = ({ infoRow }) => {
  const AccordionsGraph = accordionsGraphs({ infoRow })
  return <AccordionDisplay AccordionData={AccordionsGraph} />
}

export default GraphsDisplay
