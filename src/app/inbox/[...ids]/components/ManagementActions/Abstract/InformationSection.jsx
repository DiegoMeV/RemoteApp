import CustomTextfield from '../CustomTextfield'
import { basicDataProcessAndActivity } from '../funcs'

const InformationSection = ({ dataManagement }) => {
  const { processInfo, activityInfo } = dataManagement

  const inputs = basicDataProcessAndActivity(processInfo, activityInfo)
  return (
    <>
      {inputs?.map((item, index) => (
        <CustomTextfield
          key={index}
          label={item.label}
          value={item.value}
          fontWeight={item.fontWeight}
          fontSize={item.fontSize}
        />
      ))}
    </>
  )
}

export default InformationSection
