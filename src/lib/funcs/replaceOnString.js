export const replaceAllOnStrings = async (data, elementsToReplace) => {
  let newData = data
  for (const element of elementsToReplace) {
    const { oldElement, newElement } = element
    newData = newData.replaceAll(oldElement, newElement)
  }

  return newData
}
