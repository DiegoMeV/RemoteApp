export const getObjectToDelete = ({ pks, data }) => {
  const resultado = {}

  for (const pk of pks) {
    if (Object.prototype.hasOwnProperty.call(data, pk)) {
      resultado[pk] = data[pk]
    }
  }

  return resultado
}
