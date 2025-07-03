export const toSnakeCase = (str) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1_$2') // Add an underscore between a lowercase letter followed by an uppercase letter.
    .replace(/\s+/g, '_') // Replace spaces with underscores
    .replace(/-/g, '_') // replace hyphens with underscores (in case they come in kebab-case)
    .replace(/__+/g, '_') // Replace double underscores with a single underscore (in case they already existed)
    .toLowerCase() // Converts the entire string to lowercase
    .replace(/[^\w_]/g, '')
}
