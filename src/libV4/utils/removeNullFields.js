export const removeNullFields = (obj) =>
  Object.fromEntries(Object.entries(obj).filter(([, value]) => value !== null))
