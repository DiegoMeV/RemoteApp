export const specialCharacters = (value) => {
  if (typeof value === 'string') {
    const specialCharacters = value?.match(/[^a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ.,]/g)
    if (specialCharacters && specialCharacters.length > 2) {
      return 'No puede contener más de 2 caracteres especiales'
    }
    return true
  }
}
