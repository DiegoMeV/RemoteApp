import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useStoreState } from 'easy-peasy'
import { authVar } from '@/lib'

const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate()
  const userData = useStoreState((state) => state.user.userData)

  useEffect(() => {
    if (authVar.twoFactor) {
      if (!userData?.token && !userData?.twoFactor) {
        const urlLiteral = window.location.href
        localStorage.setItem('redirectPath', urlLiteral)
        navigate('/')
      }
      return
    }
    if (!userData?.token) {
      const urlLiteral = window.location.href
      localStorage.setItem('redirectPath', urlLiteral)
      navigate('/')
    }
  }, [userData, navigate])

  return <>{children}</>
}

export default ProtectedRoute
