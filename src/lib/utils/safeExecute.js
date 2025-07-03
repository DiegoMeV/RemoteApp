// Función para validar y sanitizar el código
const isValidCode = (code) => {
  // Definimos una lista de patrones peligrosos que queremos bloquear.
  // Cada patrón es una expresión regular (regex) que busca ciertos elementos en el código.

  const forbiddenPatterns = [
    /eval\(/g, // Bloquea el uso de `eval` que ejecuta código arbitrario y puede ser muy peligroso.
    /while\s*\(true\)/g, // Bloquea loops infinitos que podrían colapsar la aplicación, causando un bucle sin fin.
    /process\./g, // Bloquea acceso al objeto `process`, especialmente en Node.js, para evitar manipulaciones del entorno.
    /document\./g, // Bloquea acceso directo al DOM (`document`) que podría manipular el contenido de la página de manera peligrosa.
    /XMLHttpRequest/g, // Bloquea el uso de `XMLHttpRequest`, para evitar que el código ejecute solicitudes HTTP no autorizadas.
  ]

  // Iteramos sobre cada patrón en la lista `forbiddenPatterns`.
  // Si el patrón se encuentra en el código, retornamos `false`, indicando que el código no es válido.
  for (const pattern of forbiddenPatterns) {
    if (pattern.test(code)) {
      return false
    }
  }

  // Si el código pasa todas las validaciones, retornamos `true`, indicando que es seguro para su ejecución.
  // Aquí podrías agregar más validaciones según las necesidades específicas de tu aplicación.
  return true
}

export const safeExecute = (code, params) => {
  try {
    if (!isValidCode(code)) {
      throw new Error('El código contiene patrones o palabras no permitidas.')
    }

    const func = new Function('params', `return (async () => { ${code} })(params);`)
    return func(params)
  } catch (error) {
    console.error('Error al ejecutar la función:', error.message)
    return null
  }
}
