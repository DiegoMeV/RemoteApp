import { TextField, Typography } from '@mui/material'
import SelectDynamic from './SelectDynamic'
import { DatePickerDynamic } from './InputsDynamicForm'
import UploadFileDynamic from './UploadFileDynamic'
import CheckboxLabels from './CheckboxDynamic'
import SwitchDynamic from './SwitchDynamic'
import { AutocompleteDynamic } from './AutocompleteDynamic'
import ButtonDynamicForm from './ButtonDynamicForm'
import MoneyDynamic from './MoneyDynamic'
import { safeExecute } from '@/lib'
import InformativeTextDynamic from './InformativeTextDynamic'

const typesComponents = {
  text: TextField,
  password: TextField,
  integer: TextField,
  select: SelectDynamic,
  multiSelect: SelectDynamic,
  date: DatePickerDynamic,
  file: UploadFileDynamic,
  checkbox: CheckboxLabels,
  autocomplete: AutocompleteDynamic,
  boolean: SwitchDynamic,
  button: ButtonDynamicForm,
  money: MoneyDynamic,
  informative: InformativeTextDynamic,
}

const FieldRenderer = ({ field, fieldState, item, commonProps, specificProps, form }) => {
  const TypeComponent = typesComponents[item?.elementType]

  if (!TypeComponent) {
    return <Typography variant='h5'>Componente {item?.elementType} no encontrado.</Typography>
  }

  const { onChange, value, ...restField } = field
  const { error } = fieldState

  const handleChange = (event) => {
    const newValue = event?.target?.value ?? event
    onChange(newValue)
    if (item?.event && item?.typeEvent === 'onChange') {
      safeExecute(item?.event)
    }
  }

  const isError = !!error // Evaluar explícitamente si hay error

  const { ...newCommonProps } = commonProps

  const componentProps = {
    error: isError, // Siempre booleano
    helperText: isError ? error.message : item?.readOnly ? 'Campo de solo lectura' : null,
    ...restField,
    onChange: handleChange,
    value: value ?? '',
    ...newCommonProps,
    ...specificProps,
    form,
  }

  return <TypeComponent {...componentProps} />
}

export default FieldRenderer
