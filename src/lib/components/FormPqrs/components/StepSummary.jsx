import { BasicDataInbox } from '../../Process'

const StepSummary = ({ ids }) => {
  const { idProcess } = ids
  return <BasicDataInbox idProcess={idProcess} />
}

export default StepSummary
