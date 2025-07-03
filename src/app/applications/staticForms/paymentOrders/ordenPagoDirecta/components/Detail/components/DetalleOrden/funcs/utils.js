export const calculateTotal = (detalleOrdenesRow) => {
  // TODO : Es necesario hacer el query?

  let subtotalValue1 = 0
  let subtotalValue2 = 0

  detalleOrdenesRow?.forEach((element) => {
    const valor = Number(element?.valor)
    const iva = Number(element?.iva)
    subtotalValue1 += valor
    subtotalValue2 += iva
  })

  return { subtotalValue1, subtotalValue2, totalService: subtotalValue1 + subtotalValue2 }
}
