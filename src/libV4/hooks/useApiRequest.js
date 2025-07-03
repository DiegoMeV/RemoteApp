import { useStoreActions, useStoreState } from 'easy-peasy'
import { baseUrls } from '../constants'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'
import { useLogout } from '@/lib/hooks'

let refreshTokenPromise = null
let isLoggingOut = false

const useApiRequest = (includeFile) => {
  const { setTokenData } = useStoreActions((actions) => actions.token)
  const tokenData = useStoreState((state) => state.token.tokenData)
  const base = baseUrls.urlUsers
  const logout = useLogout()

  const refreshToken = async () => {
    if (!refreshTokenPromise) {
      refreshTokenPromise = (async () => {
        try {
          const response = await fetch(`${base}/auth/refreshToken`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${tokenData?.token}`,
              'Content-Type': 'application/json',
            },
          })

          const responseData = await response.json()

          if (!response.ok) {
            throw {
              status: response.status,
              error: responseData?.error || 'Error desconocido',
              message: responseData?.message || 'No se pudo refrescar el token',
            }
          }

          if (responseData && responseData.success && responseData.token) {
            setTokenData({ token: responseData.token })
            return responseData.token
          } else {
            throw {
              status: response.status,
              error: responseData?.error || 'Error desconocido',
              message: 'No se pudo refrescar el token',
            }
          }
        } catch (error) {
          console.error('❌ Error en refreshToken:', error)

          if (
            error?.status === 401 ||
            error?.error === 'Token inválido' ||
            error?.message === 'No se pudo refrescar el token'
          ) {
            if (!isLoggingOut) {
              isLoggingOut = true
              toast.error('Error en la sesión. Por favor, inicie sesión nuevamente.')
              logout()
            }
          }

          return null
        } finally {
          refreshTokenPromise = null
        }
      })()
    }

    return refreshTokenPromise
  }

  const request = async (baseURL, queryURL, method = 'POST', data = null, options = {}) => {
    let currentToken = tokenData?.token
    if (currentToken && !queryURL?.includes('/auth/refreshToken')) {
      try {
        const decoded = jwtDecode(currentToken)
        const timePretend = +import.meta.env.VITE_TOKEN_EXPIRY || 300
        const currentTime = Math.floor(Date.now() / 1000)
        const expirationTime = decoded.exp || 0
        const issuedAt = decoded.iat || currentTime
        const tokenLifetime = expirationTime - issuedAt
        const bufferTime = Math.max(tokenLifetime * 0.1, timePretend)
        if (expirationTime - currentTime <= bufferTime) {
          const newToken = await refreshToken()
          if (newToken) {
            currentToken = newToken
          } else {
            throw new Error('No se pudo obtener un nuevo token')
          }
        }
      } catch (error) {
        console.error('Error al decodificar el token o al refrescar:', error)
        toast.error('Su sesión ha expirado')
        logout()
        throw error
      }
    }

    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken') {
        currentToken = event.newValue
      }
    })

    const headers = {
      Authorization: `Bearer ${tokenData?.token || ''}`,
    }

    if (!includeFile) {
      headers['Content-Type'] = 'application/json'
    }

    const config = {
      method,
      headers,
      ...options,
    }

    if (data) {
      config.body = includeFile ? data : JSON.stringify(data)
    }

    try {
      const response = await fetch(`${baseURL}${queryURL}`, config)

      const responseBody = await response.json()

      if (!response.ok) {
        const errorMessage = responseBody?.error || response.statusText || 'Unknown error'
        throw new Error(errorMessage)
      }

      return responseBody
    } catch (error) {
      if (!error?.response?.data?.success && error?.message === 'Token no valido') {
        toast.error('Su sesión ha expirado')
        logout()
      }
      throw error
    }
  }

  return request
}

export default useApiRequest
