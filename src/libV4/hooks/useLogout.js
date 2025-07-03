import { useQueryClient } from '@tanstack/react-query'

import toast from 'react-hot-toast'
// TODO: import { baseUrls } from '../constants'
import { useNavigate } from 'react-router-dom'
import { useRootStore } from '../store'

const useLogout = (forError, message) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { clearTokenData, clearUserData, clearMenu } = useRootStore()

  const clearsStates = () => {
    clearTokenData()
    clearUserData()
    clearMenu()
    sessionStorage.clear()
    queryClient.clear()
  }

  const logout = async () => {
    clearsStates()

    /* TODO: if (sessionAzure) {
      console.error('Entry azure condition')
      window.location.href = `${baseUrls.urlUsers}/auth/azure/signout`
      return
    } */

    if (forError && message) {
      toast.error(message)
    }

    navigate('/')
  }

  return logout
}
export default useLogout
