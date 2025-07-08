import { QueryClientProvider } from '@tanstack/react-query'
import { stringToObject, ThemeSynchrox, ToastSynchrox, WaterMark } from '@/lib'
import { StoreProvider, useStoreRehydrated } from 'easy-peasy'
import { LicenseInfo } from '@mui/x-license-pro'
import { useEffect } from 'react'

const { store } = import('host-app/easyPeasyStore') // Importing the zustand store from the host app
const { queryClient } = import('host-app/queryClient') // Importing the QueryClient from the host app

const WaitForStateRehydration = ({ children }) => {
  const isRehydrated = useStoreRehydrated()
  return isRehydrated ? children : null // Renders children only if the state is rehydrated
}

LicenseInfo.setLicenseKey(`${import.meta.env.VITE_MUI_LICENSE_KEY}`)

/* This code configures a React Query QueryClient, which is being used to manage and maintain the state of queries in the application. The configuration includes parameters for the number of retries in case of query errors and the time during which data is considered fresh (staleTime), which influences how often data is updated or refetched. */

const environment = Boolean(import.meta.env.VITE_DEVELOPMENT)

const MainContainer = ({ children }) => {
  useEffect(() => {
    const themeApp = stringToObject(import.meta.env.VITE_THEME_APPLICATION, 'THEME_APPLICATION')
    const developString = environment ? 'Ambiente de prueba - ' : ''
    document.title = themeApp.title
      ? `${developString}${themeApp.title} `
      : ` ${developString}Portal Synchrox`
    if (themeApp.icon) {
      let favicon = document.querySelector('link[rel="icon"]')
      if (!favicon) {
        favicon = document.createElement('link')
        favicon.rel = 'icon'
        document.head.appendChild(favicon)
      }
      favicon.href = themeApp.icon
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [import.meta.env.VITE_THEME_APPLICATION])

  useEffect(() => {
    localStorage.removeItem('app-store')
  }, [])

  return (
    <StoreProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <ToastSynchrox />
        <WaitForStateRehydration>
          <ThemeSynchrox>
            {environment && <WaterMark />}
            {children}
          </ThemeSynchrox>
        </WaitForStateRehydration>
      </QueryClientProvider>
    </StoreProvider>
  )
}

export default MainContainer
