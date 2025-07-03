export const ValidateEmail = (mail) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
  if (regex.test(mail)) {
    return true
  }
  return false
}

export const validEmail = (email) => {
  const isValid = ValidateEmail(email)
  return !isValid ? 'Correo electrónico no válido' : true
}
