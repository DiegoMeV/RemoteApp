const generateSeries = (name, data) => {
  return [
    {
      name,
      data: data?.map(({ count = 0 }) => count) ?? [],
    },
  ]
}
export default generateSeries
