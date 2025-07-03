const escapeRegExp = (value) => {
  return value ? value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : ''
}

export const searchRows = (searchText, completeRows, setFilteredRows) => {
  if (!searchText || searchText === '') {
    setFilteredRows(completeRows)
    return
  }
  const searchWords = searchText.trim().split(/\s+/)
  const searchRegexes = searchWords.map((word) => new RegExp(escapeRegExp(word), 'i'))

  const isMatch = (value) => {
    if (typeof value === 'number' || typeof value === 'string') {
      return searchRegexes.every((regex) => regex.test(value.toString()))
    } else if (typeof value === 'object' && value !== null) {
      return Object.values(value).some(isMatch)
    }
    return false
  }

  const searchedRows = completeRows?.filter((row) => {
    return Object.values(row).some(isMatch)
  })

  setFilteredRows(searchedRows)
}
