const filterAlertsByPrivileges = (data, userPrivileges) => {
  return data
    .map((item) => {
      const hasPrivilege = userPrivileges.includes(item.privilege)

      const filteredChildren = item.children
        ? filterAlertsByPrivileges(item.children, userPrivileges)
        : null

      if (hasPrivilege || filteredChildren?.length > 0) {
        return {
          ...item,
          children: filteredChildren,
        }
      }

      return null
    })
    .filter(Boolean)
}

export default filterAlertsByPrivileges
