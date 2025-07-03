import { ComprobantePPTAL } from '@/app/applications/staticForms'

const PresupuestalRoutes = ({ Route, Routes }) => {
  return (
    <Routes>
      <Route
        path='obligacionPresupuestal'
        element={<ComprobantePPTAL />}
      />
    </Routes>
  )
}

export default PresupuestalRoutes
