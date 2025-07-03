import { MagicString } from '@/lib'
import { isEmpty } from '@/libV4'
import dayjs from 'dayjs'

const processInputs = (data, items) => {
  const inputsNoReadOnly = items.filter((item) => !item.readOnly)
  return Object.entries(data || {}).reduce((acc, [key, value]) => {
    const inputItem = inputsNoReadOnly.find((input) => input.id === key)

    let parsedValue
    if (isEmpty(value)) {
      parsedValue = null
    } else if (inputItem?.dataType === 'NUMBER') {
      parsedValue = Number(value)
    } else if (typeof value === 'boolean') {
      parsedValue = value.toString()
    } else if (inputItem?.dataType === 'DATE') {
      const format = inputItem.format || MagicString.DATE_FORMAT.ORACLE_FORMAT
      parsedValue = dayjs(value).format(format)
    } else {
      parsedValue = value
    }

    if (
      inputItem &&
      parsedValue !== undefined &&
      parsedValue !== '' &&
      !Number.isNaN(parsedValue)
    ) {
      acc[key] = parsedValue
    }

    return acc
  }, {})
}

export default processInputs
