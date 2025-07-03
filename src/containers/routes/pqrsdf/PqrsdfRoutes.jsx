import { PageNotFound } from '@/lib'
import { isUUID } from '@/libV4'
import { Home, InfoInquiry, Inquiry, Layout, Registry, RegistryTypeProcess } from '@/pages/pqrsdf'
import { useParams } from 'react-router-dom'

const PqrsdfRoutes = ({ Routes, Route }) => {
  const { id } = useParams()
  return (
    <Routes>
      {!isUUID(id) && (
        <Route
          path='/'
          element={<PageNotFound />}
        />
      )}
      <Route
        path='/'
        element={<Home />}
      />
      <Route
        path=''
        element={<Layout />}
      >
        <Route
          path='/registry'
          element={<Registry />}
        />
        <Route
          path='/registry/:typeProcess/:idProcess'
          element={<RegistryTypeProcess />}
        />
        <Route
          path='/inquiry'
          element={<Inquiry />}
        />
        <Route
          path='/inquiry/:idInquiry'
          element={<InfoInquiry />}
        />
      </Route>
    </Routes>
  )
}

export default PqrsdfRoutes
