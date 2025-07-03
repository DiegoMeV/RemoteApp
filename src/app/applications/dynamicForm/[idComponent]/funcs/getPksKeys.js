export const getPksKeys = ({ inputArray = [], pkProperty = 'isPk', identifierProperty = 'id' }) => {
  const pkIdentifiers = []

  inputArray.forEach((item) => {
    if (item && typeof item === 'object') {
      const hasPkFlag = Object.prototype.hasOwnProperty.call(item, pkProperty)
      const isPrimaryKey = hasPkFlag && item[pkProperty] === true

      const hasIdentifier = Object.prototype.hasOwnProperty.call(item, identifierProperty)

      if (isPrimaryKey && hasIdentifier) {
        pkIdentifiers.push(item[identifierProperty])
      }
    }
  })

  return pkIdentifiers
}
