import { Grid } from '@mui/material'
import {
  AutocompleteSelect,
  ButtonInput,
  CheckboxInput,
  CustomTextField,
  DateInput,
  LovInputRender,
  MoneyInput,
  SelectInput,
  SwitchInput,
} from '.'

const actionComponents = {
  switch: (props) => <SwitchInput {...props} />,
  checkbox: (props) => <CheckboxInput {...props} />,
  select: (props) => <SelectInput {...props} />,
  autoCompleteSelect: (props) => <AutocompleteSelect {...props} />,
  button: (props) => <ButtonInput {...props} />,
  date: (props) => <DateInput {...props} />,
  money: (props) => <MoneyInput {...props} />,
  lov: (props) => <LovInputRender {...props} />,
}

const ChooseInput = ({ item, control, setValue }) => {
  const ActionComponent =
    actionComponents[item?.type] ||
    (() => (
      <CustomTextField
        item={item}
        control={control}
      />
    ))
  return (
    <Grid
      item
      xs={12}
      sm={item?.spaceSm ?? 6}
      md={item?.space ?? 6}
    >
      <ActionComponent
        control={control}
        item={item}
        setValue={setValue}
      />
    </Grid>
  )
}

export default ChooseInput
