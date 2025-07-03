import { CustomTextField, SelectInput, SwitchInput } from '.'

const actionComponents = {
  switch: (props) => <SwitchInput {...props} />,
  select: (props) => <SelectInput {...props} />,
}

const ChooseInput = ({ item, control }) => {
  const ActionComponent =
    actionComponents[item.type] ||
    (() => (
      <CustomTextField
        item={item}
        control={control}
      />
    ))
  return (
    <ActionComponent
      control={control}
      item={item}
    />
  )
}

export default ChooseInput
