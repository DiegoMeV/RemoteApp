export const blockInfo = (block) => {
  const tableOptios = block?.tableOptions
  const blockId = block?.blockId
  const items = block?.items
  const requestType = block?.dataSource
  const rawQuery = block?.rawQuery
  const blockEvents = block?.events
  const isControlBlock = block?.isControlBlock ?? false
  const filterParam = block?.filterParam
  const relationShips = block?.relationShips ?? []

  return {
    tableOptios,
    blockId,
    items,
    requestType,
    rawQuery,
    blockEvents,
    isControlBlock,
    filterParam,
    relationShips,
  }
}
