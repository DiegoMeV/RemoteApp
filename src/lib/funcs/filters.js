export const getMostRecentDate = (data, dateToFilter) => {
  if (!Array.isArray(data) || data.length === 0) {
    return ''
  }

  return data.reduce((mostRecent, current) => {
    const currentDate = new Date(current?.[dateToFilter])
    const mostRecentDate = new Date(mostRecent?.[dateToFilter])

    return currentDate > mostRecentDate ? current : mostRecent
  })
}

export const orderingArray = (array, key) => {
  // If the object does not have an order, it will be placed at the end
  return array?.sort((a, b) => {
    if (!a?.[key]) {
      return 1
    }
    if (!b?.[key]) {
      return -1
    }
    return a?.[key] - b?.[key]
  })
}
