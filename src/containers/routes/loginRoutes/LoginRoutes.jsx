import AccessLink from '@/app/accessLink/page'
import AuthGoogle from '@/app/authGoogle/page'
import AuthMicrosoft from '@/app/authMicrosoft/page'
import { PageNotFound } from '@/lib'

const LoginRoutes = ({ Routes, Route }) => {
  return (
    <Routes>
      <Route
        path='authGoogle'
        element={<AuthGoogle />}
      />
      <Route
        path='accessLink'
        element={<AccessLink />}
      />
      <Route
        path='authMicrosoft'
        element={<AuthMicrosoft />}
      />
      <Route
        path='*'
        element={<PageNotFound />}
      />
    </Routes>
  )
}

export default LoginRoutes
