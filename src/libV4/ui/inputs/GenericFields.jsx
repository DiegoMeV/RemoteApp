import { actionComponents } from './GenericChooseInput'

const GenericFields = ({ fields = [], generalProps = {} }) => {
  return fields?.map?.((item) => {
    const Input = actionComponents[item?.type] || actionComponents.default
    return (
      <Input
        key={item?.name}
        {...item}
        {...generalProps}
      />
    )
  })
}

export default GenericFields
