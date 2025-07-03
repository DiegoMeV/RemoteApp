import GenericSwitch from './GenericSwitch'
import GenericCheckBox from './GenericCheckBox'
import GenericSelect from './GenericSelect'
import GenericAutocomplete from './GenericAutocomplete'
import GenericAutocompleteRequest from './GenericAutocompleteRequest'
import GenericButton from './GenericButton'
import GenericDatePicker from './GenericDatePicker'
import GenericHtmlEditor from './GenericHtmlEditor'
import GenericTextfield from './GenericTextfield'
import GenericMoney from './GenericMoney'
import GenericCode from './GenericCode'
import GenericIconButton from './GenericIconButton'

export const actionComponents = {
  switch: GenericSwitch,
  checkbox: GenericCheckBox,
  select: GenericSelect,
  autocomplete: GenericAutocomplete,
  autocompleteRequest: GenericAutocompleteRequest,
  button: GenericButton,
  iconButton: GenericIconButton,
  date: GenericDatePicker,
  html: GenericHtmlEditor,
  default: GenericTextfield,
  money: GenericMoney,
  code: GenericCode,
}
