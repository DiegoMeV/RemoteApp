export const getRelatedFilters = (relationShips) => {
  const filters = {}
  if (
    Array.isArray(relationShips) &&
    relationShips.length > 0 &&
    typeof window !== 'undefined' &&
    typeof window.getValueItem === 'function'
  ) {
    relationShips.forEach((rel) => {
      if (rel?.blockRelaId) {
        const relatedBlockValues = window.getValueItem(rel?.blockRelaId)
        if (
          rel?.relItemId &&
          relatedBlockValues &&
          relatedBlockValues[rel?.blockItemId] !== undefined
        ) {
          filters[rel?.relItemId] = relatedBlockValues[rel?.blockItemId]
        }
      }
    })
  }
  return filters
}
