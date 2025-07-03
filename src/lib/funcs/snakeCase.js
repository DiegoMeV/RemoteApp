function removeAccents(text) {
  if (text === null || text === undefined) {
    return ''
  }

  return text
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\w\s]/gi, '')
}

export function toSnakeCase(text) {
  const cleanText = removeAccents(text)
  return cleanText.replace(/\s+/g, '_').toLowerCase()
}
