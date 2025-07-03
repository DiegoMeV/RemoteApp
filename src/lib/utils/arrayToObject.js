import { toSnakeCase } from './toSnakeCase'

export const arrayToObject = (array, keyName, valueName, type) => {
  return array.reduce((acc, item) => {
    let newNameKey = keyName
    if (type === 'snake') {
      newNameKey = toSnakeCase(item[newNameKey])
    }
    acc[newNameKey] = item[valueName]
    return acc
  }, {})
}
