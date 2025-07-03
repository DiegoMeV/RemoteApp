export const getObjectDifferences = (original, updated, validateAddDelete = false) => {
  const differences = {}

  Object.keys(original).forEach((key) => {
    const originalValue = original[key]
    const updatedValue = updated[key]

    if (validateAddDelete && !(key in updated)) {
      differences[key] = undefined
    } else {
      const isObject =
        typeof originalValue === 'object' &&
        originalValue !== null &&
        typeof updatedValue === 'object' &&
        updatedValue !== null

      if (isObject) {
        const nestedDiff = getObjectDifferences(originalValue, updatedValue, validateAddDelete)
        if (Object.keys(nestedDiff).length > 0) {
          differences[key] = nestedDiff
        }
      } else if (originalValue !== updatedValue) {
        differences[key] = updatedValue
      }
    }
  })

  if (validateAddDelete) {
    Object.keys(updated).forEach((key) => {
      if (!(key in original)) {
        differences[key] = updated[key]
      }
    })
  }

  return differences
}
