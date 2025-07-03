const partitionData = (items, filterInputs) => {
  return items.reduce(
    (acc, item) => {
      if (item?.isPk) {
        acc.dataPks[item?.id] = filterInputs[item?.id]
      } else {
        acc.dataEdit[item?.id] = filterInputs[item?.id]
      }
      return acc
    },
    { dataEdit: {}, dataPks: {} }
  )
}

export default partitionData
