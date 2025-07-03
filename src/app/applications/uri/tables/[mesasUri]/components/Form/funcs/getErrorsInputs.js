export const getErrorsInputs = (requiredInputs, inputName, requiredInput) => {
  let isEmpty = false

  // Iterar sobre los inputs requeridos para encontrar el específico basado en inputName.
  for (let obj of requiredInputs) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(inputName)) {
      const value = obj[inputName]
      // Evaluar si el campo está vacío.
      if ((typeof value === 'string' && value.trim() === '') || value == null) {
        isEmpty = true
        break // Campo encontrado y está vacío, salir del bucle.
      }
    }
  }

  // Decidir si mostrar el error basado en el estado específico del campo y el estado global.
  const shouldShowError = isEmpty && (requiredInput || !requiredInput)

  return {
    error: shouldShowError,
    helperText: shouldShowError ? 'Este campo es requerido' : '',
  }
}
