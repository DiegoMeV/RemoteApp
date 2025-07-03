const editData = (fullData) => {
  const { idForm, data, idComponentForm, idApplication, prevData, restParams, navigation } =
    fullData

  let path = `/applications/dynamicForm/${idForm}/${idComponentForm}/${idApplication}`

  const objetParams = prevData?.reduce((acc, item) => {
    if (item?.pk) {
      const columnName = item?.column.toLowerCase()
      acc[`${item?.column.toLowerCase()}.pk`] = data[columnName]
    }
    return { ...acc, ...restParams }
  }, {})

  const queryParams = new URLSearchParams(objetParams).toString()

  if (path) {
    path += `?${queryParams}`
  }

  navigation(path)
}

export default editData
