import { useEffect } from 'react'
import { useMenuApplication, useGetApplication } from '@/lib'
import { filterAlertsByPrivileges, mapMenuApplications, mapMenuItems } from '../funcs'
import { useOptionsAlertas } from '@/app/applications/funcs'
import { useStoreState } from 'easy-peasy'

const useMenuApplications = (setFullMenu) => {
  const userData = useStoreState((state) => state.user.userData)
  const userPrivilegesSid = userData?.privileges
  const dataAlerts = useOptionsAlertas()

  const dataAlertsFiltered = filterAlertsByPrivileges(dataAlerts, userPrivilegesSid)

  const { data: menuApplications, isLoading: loadingApplications } = useGetApplication()
  const {
    mutateAsync: getMenuApplications,
    isPending: loadingMenu,
    variables,
  } = useMenuApplication({
    onSuccess: async (e) => {
      const submenu = e?.data ? mapMenuItems(e?.data) : []
      setFullMenu((prevMenu) =>
        prevMenu.map((menu) => {
          if (menu.key === variables) {
            return { ...menu, children: submenu }
          }
          return menu
        })
      )
    },
  })

  useEffect(() => {
    const newMenuApplications = menuApplications?.data
      ? mapMenuApplications(menuApplications.data)
      : []
    setFullMenu([...dataAlertsFiltered, ...newMenuApplications])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [menuApplications, setFullMenu])

  return { menuApplications, getMenuApplications, loadingApplications, loadingMenu }
}

export default useMenuApplications
