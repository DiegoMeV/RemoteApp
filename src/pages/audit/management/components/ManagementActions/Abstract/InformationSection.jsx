import { actionComponents } from '@/libV4'
import { basicDataProcessAndActivity } from '../funcs'

const InformationSection = ({
  dataManagement,
  activityToCreate,
  setActivityToCreate,
  actualActivity,
}) => {
  const { processInfo, activityInfo } = dataManagement

  const inputs = basicDataProcessAndActivity(
    processInfo,
    activityToCreate,
    activityInfo,
    setActivityToCreate,
    actualActivity
  )
  return inputs?.map?.((item) => {
    const Input = actionComponents[item?.type] || actionComponents.default
    return (
      <Input
        key={item?.name}
        className='col-span-6'
        {...item}
      />
    )
  })
}

export default InformationSection
