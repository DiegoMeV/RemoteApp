import dayjs from 'dayjs'

export const sortRowsByFechaVencimiento = (rows) => {
  return rows.slice().sort((a, b) => {
    const dateA =
      a?.fechaVencimiento && dayjs(a?.fechaVencimiento, 'DD/MM/YYYY').isValid()
        ? dayjs(a?.fechaVencimiento, 'DD/MM/YYYY').valueOf()
        : 0
    const dateB =
      b?.fechaVencimiento && dayjs(b?.fechaVencimiento, 'DD/MM/YYYY').isValid()
        ? dayjs(b?.fechaVencimiento, 'DD/MM/YYYY').valueOf()
        : 0
    return dateA - dateB
  })
}
