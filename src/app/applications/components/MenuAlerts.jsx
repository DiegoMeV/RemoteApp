import { Box, CircularProgress, ListSubheader } from '@mui/material'
import { menuStyles } from './styles'
import { BackdropLoading, useGetApplication, useMenuApplication } from '@/lib'
import { useOptionsAlertas } from '../funcs'
import { useEffect, useState } from 'react'
import MenuMap from './MenuMap'

const MenuAlerts = ({ handleClose }) => {
  const typePath = (item, params = {}) => {
    let path = ''

    if (item.MenuApplication?.length) {
      path = null
    }
    if (item.type === 'FORM') {
      path = `/applications/dynamicForm/${item.idComponent}/?idApplication=${item.idApplication}&itemId=${item.id}`
    }
    if (
      item.type === 'PAGE' &&
      item.execParams === '/applications/request' &&
      item.optionName === 'Dashboard'
    ) {
      path = item.execParams
    } else if (item.type === 'PAGE') {
      path = `${item.execParams}`
    } else if (item.type === 'WEB_COMPONENT') {
      path = `${item.execParams}`
    }

    if (path) {
      const separator = path.includes('?') ? '&' : '?'
      const queryParams = new URLSearchParams(params).toString()
      path += queryParams ? `${separator}${queryParams}` : ''
    }

    return path
  }
  const optionsAlert = useOptionsAlertas()
  const [fullMenu, setFullMenu] = useState([])
  const { data: menuApplications, isLoading } = useGetApplication()
  const {
    mutateAsync: getMenuApplications,
    isPending,
    variables,
  } = useMenuApplication({
    onSuccess: async (e) => {
      const submenu = e?.data ? mapMenuItems(e?.data) : []
      const newMenu = await fullMenu?.map((menu) => {
        if (menu.id === variables) return { ...menu, submenu }
        return menu
      })
      setFullMenu(newMenu)
    },
  })
  const mapMenuApplications = (items) => {
    return items.map((item) => ({
      id: item.id,
      path: null,
      label: item.name,
      isApplication: true,
      submenu: [],
    }))
  }
  const mapMenuItems = (items) => {
    const sortedItems = items.sort((a, b) => a.order - b.order)
    const filterEnabled = sortedItems.filter((item) => item.isEnabled)

    return filterEnabled.map((item) => ({
      id: item.id,
      type: item.type,
      module: item.module,
      url: item.url,
      optionModule: item.optionModule,
      path: `${typePath(item, item?.menuApplicationSpecs?.params)}`,
      label: item.optionName,
      typeModule: item.idComponent,
      icon: item.icon,
      params: item?.menuApplicationSpecs?.params,
      submenu: item.MenuApplication?.length ? mapMenuItems(item.MenuApplication) : null,
    }))
  }

  useEffect(() => {
    const newMenuApplications = menuApplications?.data
      ? mapMenuApplications(menuApplications.data)
      : []
    setFullMenu(newMenuApplications)
  }, [menuApplications])

  const mergedOptions = [...optionsAlert, ...fullMenu]

  return (
    <>
      <ListSubheader
        component='div'
        sx={menuStyles}
      >
        Módulos
      </ListSubheader>
      <BackdropLoading loading={isPending} />
      {isLoading ? (
        <Box sx={{ display: 'flex', paddingLeft: '20px', minWidth: '280px' }}>
          <CircularProgress size={20} />
        </Box>
      ) : (
        <Box
          height={'93%'}
          backgroundColor='transparent'
          position='relative'
          zIndex='998'
          minWidth='280px'
          sx={{ overflowY: 'auto' }}
        >
          <MenuMap
            getMenuApplications={getMenuApplications}
            items={mergedOptions}
            handleClose={handleClose}
          />
        </Box>
      )}
    </>
  )
}

export default MenuAlerts
