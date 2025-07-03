import GenericAutocomplete from './GenericAutocomplete'
import GenericAutocompleteRequest from './GenericAutocompleteRequest'
import GenericCode from './GenericCode'
import GenericSelect from './GenericSelect'
import GenericSwitch from './GenericSwitch'
import GenericTextfield from './GenericTextfield'
import GenericTel from './GenericTel'
import GenericDate from './GenericDate'
import GenericDateTime from './GenericDateTime'
import GenericCheckbox from './GenericCheckbox'
import GenericMoney from './GenericMoney'
import TextFieldQuery from './TextFieldQuery'
import GenericRadioGroup from './GenericRadioGroup'

export const actionComponents = {
  select: GenericSelect,
  autocomplete: GenericAutocomplete,
  autocompleteRequest: GenericAutocompleteRequest,
  textfieldQuery: TextFieldQuery,
  switch: GenericSwitch,
  checkbox: GenericCheckbox,
  code: GenericCode,
  tel: GenericTel,
  date: GenericDate,
  dateTime: GenericDateTime,
  multiline: GenericTextfield,
  money: GenericMoney,
  default: GenericTextfield,
  radioSelect: GenericRadioGroup,
}
