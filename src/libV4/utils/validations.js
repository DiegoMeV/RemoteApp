import { isEmpty } from '../funcs'

export const isRowId = (id) => {
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/
  return !isEmpty(id) && regex.test(id)
}

export const toArray = (arg) => {
  if (arg === undefined || arg === null) {
    return []
  }
  return Array.isArray(arg) ? arg : [arg]
}

export const isUUID = (value) => {
  const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return uuidRegex.test(value)
}
