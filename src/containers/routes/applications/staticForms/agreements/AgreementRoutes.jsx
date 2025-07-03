import { AgreementsList, EditAgreements } from '@/app/applications/staticForms'

const AgreementRoutes = ({ Route, Routes }) => {
  return (
    <Routes>
      <Route
        path='listAgreements'
        element={<AgreementsList />}
      />
      <Route
        path='editAgreements'
        element={<EditAgreements />}
      />
    </Routes>
  )
}

export default AgreementRoutes
