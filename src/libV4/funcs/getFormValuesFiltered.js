export const getFormValuesFiltered = ({ form, array = [], filterNull = true }) => {
  const currentValues = form.getValues()

  const savableFieldsSet = new Set(array)

  return Object.entries(currentValues).reduce((acc, [key, value]) => {
    if (savableFieldsSet.has(key) && (!filterNull || value !== null)) {
      acc[key] = value
    }
    return acc
  }, {})
}
