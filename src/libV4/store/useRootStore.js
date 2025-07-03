import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import {
  companyStore,
  confirmAlertStore,
  darkStore,
  menuApplicationsSelected,
  menuModel,
  sessionAzureStore,
  tokenStore,
  userStore,
  valuesListStore,
} from './stores'

const useRootStore = create(
  persist(
    (set) => ({
      ...userStore(set),
      ...tokenStore(set),
      ...companyStore(set),
      ...confirmAlertStore(set),
      ...darkStore(set),
      ...valuesListStore(set),
      ...sessionAzureStore(set),
      ...menuModel(set),
      ...menuApplicationsSelected(set),
    }),
    {
      name: 'app-store',
    }
  )
)
export default useRootStore
