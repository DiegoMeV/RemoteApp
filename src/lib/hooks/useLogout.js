import { useNavigate } from 'react-router-dom'
import { useStoreActions, useStoreState } from 'easy-peasy'
import toast from 'react-hot-toast'
import { baseUrls } from '../constants'
import { useQueryClient } from '@tanstack/react-query'
import { useRootStore } from '@/libV4'

const useLogout = (forError, message) => {
  const queryClient = useQueryClient()
  const urlUsers = baseUrls.urlUsers
  const navigate = useNavigate()
  const { clearMenuSelected, clearTokenData, clearUserData } = useRootStore()
  const { sessionAzure } = useStoreState((state) => state.sessionAzure)
  const { token } = useStoreState((state) => state.token.tokenData || {})
  const clearTokenDataPeasy = useStoreActions((actions) => actions.token.clearTokenData)
  const clearUserDataPeasy = useStoreActions((actions) => actions.user.clearUserData)
  const clearCompanyData = useStoreActions((actions) => actions.company.clearCompanyData)
  const clearInfoFlowState = useStoreActions((actions) => actions.infoFlowState.clearInfoFlowState)
  const clearstateSideBar = useStoreActions((actions) => actions.stateSideBar.clearstateSideBar)
  const clearReactFlowState = useStoreActions(
    (actions) => actions.reactFlowState.clearReactFlowState
  )
  const clearOrientation = useStoreActions((actions) => actions.stateOrientation.clearOrientation)
  const clearSelectOption = useStoreActions(
    (actions) => actions.stateSideBarAdmin.clearSelectOption
  )
  const clearConfirmAlertProps = useStoreActions(
    (actions) => actions.confirmAlert.clearConfirmAlertProps
  )
  const clearMenu = useStoreActions((actions) => actions.menu.clearMenu)
  const clearSearch = useStoreActions((actions) => actions.searchText.clearSearch)
  const clearTypeModule = useStoreActions((actions) => actions.moduleTypeSelected.clearTypeModule)
  const clearPaymentOrders = useStoreActions(
    (actions) => actions.paymentOrdersModel.clearPaymentOrders
  )
  const clearUserParameter = useStoreActions((actions) => actions.userParameter.clearUserParameter)

  const logoutBackend = async () => {
    try {
      const response = await fetch(`${urlUsers}/auth/logout`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token ?? ''}`,
          'Content-Type': 'application/json',
        },
      })
      if (!response.ok) {
        throw new Error('Error al cerrar sesión')
      }
    } catch (e) {
      console.error(e?.message || 'Error al cerrar sesión')
    }
  }

  const clearsStates = () => {
    clearTokenDataPeasy()
    clearUserDataPeasy()
    clearCompanyData()
    clearInfoFlowState()
    clearstateSideBar()
    clearReactFlowState()
    clearOrientation()
    clearSelectOption()
    clearTypeModule()
    clearConfirmAlertProps()
    clearMenu()
    clearSearch()
    clearPaymentOrders()
    clearUserParameter()
    clearTokenData()
    clearUserData()
    sessionStorage.clear()
    queryClient.clear()
    logoutBackend()
    clearMenuSelected()
    localStorage.clear()
    localStorage.removeItem('app-store')
  }

  const logout = async () => {
    clearsStates()

    if (sessionAzure) {
      console.error('Entry azure condition')
      window.location.href = `${baseUrls.urlUsers}/auth/azure/signout`
      return
    }

    if (forError && message) {
      toast.error(message)
    }

    navigate('/')
  }

  return logout
}
export default useLogout
