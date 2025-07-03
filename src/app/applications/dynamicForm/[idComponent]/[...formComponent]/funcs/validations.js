import { isEmpty } from '@/libV4'

export const parseDefaultValue = (type, defaultValue) => {
  if (type === 'NUMBER' && !isEmpty(defaultValue)) {
    return Number(defaultValue)
  }
  return defaultValue
}
