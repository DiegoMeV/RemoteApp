const prepareDataComponent = (dataComponent, queryData) => {
  const title = dataComponent?.data?.[0]?.lastVersionInfo?.specification?.title || ''
  const idComponentForm =
    dataComponent?.data?.[0]?.lastVersionInfo?.specification?.idComponentForm || ''

  const rowsWithId = queryData?.data?.map((row, index) => {
    return row.id ? row : { id: index, ...row }
  })

  return { title, idComponentForm, rowsWithId }
}

export default prepareDataComponent
