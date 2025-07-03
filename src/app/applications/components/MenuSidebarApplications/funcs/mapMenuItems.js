import getIconByType from './getIconByType'

const mapMenuItems = (items) => {
  const sortedItems = items.sort((a, b) => a.order - b.order)
  const filterEnabled = sortedItems.filter((item) => item.isEnabled)
  const typePath = (item, params = {}) => {
    if (item.MenuApplication?.length) {
      return null
    }

    const pathStrategies = {
      FORM: () =>
        `/applications/dynamicForm/${item.idComponent}/?idApplication=${item.idApplication}&itemId=${item.id}`,
      PAGE: () => item.execParams,
      WEB_COMPONENT: () => item.execParams,
      DIRECT_FORM: () =>
        `/applications/dynamicForm/${item?.id}/${item?.idComponent}/${item?.idApplication}?isDirectForm=true`,
    }

    const path = pathStrategies[item.type]?.() || ''

    if (path) {
      const separator = path.includes('?') ? '&' : '?'
      const queryParams = new URLSearchParams(params).toString()
      return queryParams ? `${path}${separator}${queryParams}` : path
    }

    return path
  }

  return filterEnabled.map((item) => ({
    key: item.id,
    icon: getIconByType(item.type, item.MenuApplication?.length),
    data: {
      label: item?.optionName,
      type: item?.type,
      typeModule: item?.idComponent,
      optionModule: item?.optionModule,
      module: item?.module,
      url: item?.url,
      params: item?.menuApplicationSpecs?.params,
      path: `${typePath(item, item?.menuApplicationSpecs?.params)}`,
    },
    label: item.optionName,
    title: item.optionName,
    children: item.MenuApplication?.length ? mapMenuItems(item.MenuApplication) : undefined,
  }))
}

export default mapMenuItems
