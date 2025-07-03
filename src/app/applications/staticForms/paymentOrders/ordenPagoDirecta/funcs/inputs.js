import dayjs from 'dayjs'

export const typeHandlers = {
  date: (value) => dayjs(value).format('YYYY-MM-DD HH:mm:ss'),
  number: (value) => Number(value),
  money: (value) => Number(value),
  switch: (value) => (value === true ? 'S' : 'N'),
  default: (value) => value,
}

export const filterData = (inputs, allData) => {
  const filterReadOnly = inputs.filter((input) => input.InputProps?.readOnly !== true)

  const filterPKs = filterReadOnly.filter((input) => input.primaryKey !== true)

  const dataFiltered = filterPKs.reduce((acc, input) => {
    const name = input?.name?.includes('.') ? input.name.split('.')?.[1] : input.name

    if (allData[name]) {
      const convertValue = typeHandlers[input?.type] || typeHandlers.default
      acc[name] = convertValue(allData[name])
    }
    return acc
  }, {})

  return dataFiltered
}
