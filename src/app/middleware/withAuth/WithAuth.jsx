import { useEffect } from 'react'
import { useStoreState } from 'easy-peasy'
import { Loading } from '@/lib'
import { Box } from '@mui/material'
import { useLocation, useNavigate } from 'react-router-dom'

const WithAuth = ({ children }) => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const { token } = useStoreState((state) => state.token.tokenData || {})
  const authConditional = !token

  useEffect(() => {
    // Check if you do not have a valid token
    if (authConditional) {
      // Redirects the user to the login page.
      navigate('/')
    }
  }, [token, navigate, pathname, authConditional])

  // If you have a valid token, render the original component.
  return authConditional ? (
    <Box sx={{ bgcolor: 'white', height: '100vh' }}>
      <Loading />
    </Box>
  ) : (
    <>{children}</>
  )
}

export default WithAuth
