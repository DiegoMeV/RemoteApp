export const getTableOptions = (dataComponent) => {
  const specification = dataComponent?.data?.[0]?.lastVersionInfo?.specification || {}

  const addAllowed =
    Object.prototype.hasOwnProperty.call(specification, 'addAllowed') &&
    specification.addAllowed === false
      ? false
      : true

  const editAllowed =
    Object.prototype.hasOwnProperty.call(specification, 'editAllowed') &&
    specification.editAllowed === false
      ? false
      : true

  const deleteAllowed =
    dataComponent?.data?.[0]?.lastVersionInfo?.specification?.deleteAllowed === true

  return {
    addAllowed,
    editAllowed,
    deleteAllowed,
  }
}
