import { AppsByCompany, Companies } from '../../../pages'

const CompaniesRoutes = ({ Routes, Route }) => {
  return (
    <Routes>
      <Route
        index
        element={<Companies />}
      />
      <Route
        path=':idCompany'
        element={<AppsByCompany />}
      />
    </Routes>
  )
}

export default CompaniesRoutes
