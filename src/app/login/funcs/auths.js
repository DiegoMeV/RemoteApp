import { authVar, baseUrls } from '@/lib'

export const fisrtAuth = (navigate, devMode) => {
  const href = window.location.href

  if (!devMode) {
    switch (authVar?.default) {
      case 'GOOGLE':
        // TODO : navigate(`${baseUrls?.urlUsers}/auth/login/federated/google/`)
        window.open(
          `${baseUrls?.urlUsers}/auth/login/federated/google?destination=${href}`,
          '_self'
        )
        break
      case 'MICROSOFT':
        // TODO : navigate(`${baseUrls?.urlUsers}/auth/azure/signin`)
        window.open(`${baseUrls?.urlUsers}/auth/azure/signin`, '_self')
        break
      default:
        // Aquí puedes manejar cualquier otro caso que necesites
        break
    }
  }
}

export const buttonsAuth = (method, devMode) => {
  return authVar?.options.includes(method) || devMode
}

const redirectOptions = ['GOOGLE', 'MICROSOFT']

export const defaultOption = (devMode) => {
  return (
    !(
      authVar?.default !== null &&
      authVar?.default !== '' &&
      redirectOptions?.includes(authVar?.default)
    ) || devMode
  )
}
