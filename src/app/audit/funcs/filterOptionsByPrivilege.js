const filterOptionsByPrivilege = (options) => {
  return options
    .map((option) => {
      if (option.options) {
        const filteredSubOptions = option.options.filter((sub) => sub.privilege)
        if (filteredSubOptions.length === 0) return null
        return {
          ...option,
          options: filteredSubOptions,
        }
      }

      return option.privilege ? option : null
    })
    .filter(Boolean) // elimina los null
}

export default filterOptionsByPrivilege
