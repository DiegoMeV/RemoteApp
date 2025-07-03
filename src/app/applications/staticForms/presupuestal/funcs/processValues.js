import { MagicString } from '@/lib'
import dayjs from 'dayjs'

export const processValues = (values, inputs) => {
  const result = { ...values }

  inputs.forEach(({ name, type }) => {
    const shortName = name.split('.').pop()
    const value = values[shortName]

    if (!value) return

    if (type === 'date') {
      const parsed = dayjs(value)
      if (parsed.isValid()) {
        result[shortName] = parsed.format(MagicString.DATE_FORMAT.ORACLE_FORMAT)
      }
    }

    if (shortName === 'tipo_compptal') {
      result[shortName] = value.toString().toUpperCase().trim()
    }
  })

  return result
}
