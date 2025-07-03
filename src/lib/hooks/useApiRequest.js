import axios from 'axios'
import { useStoreActions, useStoreState } from 'easy-peasy'
import { baseUrls } from '../constants'
import useLogout from './useLogout'
import { jwtDecode } from 'jwt-decode'
import toast from 'react-hot-toast'

// Variable global para evitar múltiples refrescos simultáneos
let refreshTokenPromise = null
let isLoggingOut = false // Bandera para evitar múltiples logout

const useApiRequest = () => {
  const { token } = useStoreState((state) => state.token.tokenData || {})
  const { setTokenData } = useStoreActions((actions) => actions.token)
  const base = baseUrls.urlUsers
  const logout = useLogout()

  /**
   * Función para refrescar el token.
   */
  const refreshToken = async () => {
    if (!refreshTokenPromise) {
      refreshTokenPromise = (async () => {
        try {
          const response = await axios({
            method: 'post',
            baseURL: base,
            url: '/auth/refreshToken',
            headers: {
              ...(token && { Authorization: `Bearer ${token}` }),
            },
          })

          const responseData = response?.data
          if (responseData && responseData.success && responseData.token) {
            setTokenData({ token: responseData.token })
            localStorage.setItem('authToken', responseData.token) // Sincronizar token
            return responseData.token
          } else {
            throw new Error('No se pudo refrescar el token')
          }
        } catch (error) {
          console.error('Error al refrescar el token:', error)

          // Solo cerrar sesión si el error es específicamente de autenticación
          if (
            error.response?.status === 401 || // No autorizado
            error.response?.data?.error === 'Token inválido' || // Error explícito del backend
            error.message === 'No se pudo refrescar el token' // Error interno de validación
          ) {
            if (!isLoggingOut) {
              isLoggingOut = true
              toast.error('Error en la sesión. Por favor, inicie sesión nuevamente.')
              logout()
            }
          }

          return null // Devolver null en caso de error
        } finally {
          refreshTokenPromise = null // Restablecer la promesa después de finalizar
        }
      })()
    }

    return refreshTokenPromise
  }

  /**
   * Función para realizar peticiones API.
   * Verifica si el token está a punto de expirar y lo refresca de ser necesario.
   *
   * @param {string} baseURL - URL base de la API.
   * @param {string} queryURL - Endpoint de la petición.
   * @param {string} [method='post'] - Método HTTP.
   * @param {object|null} [data=null] - Datos a enviar (si aplica).
   * @param {object} [options={}] - Opciones adicionales para Axios.
   *
   * @returns {object} Respuesta de la API.
   */
  const request = async (baseURL, queryURL, method = 'post', data = null, options = {}) => {
    let currentToken = token

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
        toast.error('Su sesión ha expirado', { id: 'session-expired' })
        logout()
        throw error
      }
    }

    // Sincronizar token entre pestañas
    window.addEventListener('storage', (event) => {
      if (event.key === 'authToken') {
        currentToken = event.newValue
      }
    })

    const headers = {
      ...(currentToken ? { Authorization: `Bearer ${currentToken}` } : {}),
      ...(options?.headers || {}),
    }

    const config = {
      method,
      url: queryURL,
      baseURL,
      headers,
      ...options,
    }

    if (data) {
      config.data = data
    }

    try {
      const response = await axios(config)

      if (response?.data && !response?.data.success && response?.data.error === 'Token no valido') {
        toast.error('Su sesión ha expirado', { id: 'session-expired' })
        logout()
        return
      }

      return response?.data
    } catch (error) {
      if (error?.response?.data?.error === 'Token no valido') {
        toast.error('Su sesión ha expirado', { id: 'session-expired' })
        logout()
      }

      throw error
    }
  }

  return request
}

export default useApiRequest
