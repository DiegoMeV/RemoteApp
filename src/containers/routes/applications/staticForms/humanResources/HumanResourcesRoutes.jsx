import { PayrollLiquidation, PUAutoliq, Resume } from '@/app/applications/staticForms'
import { EditPayrollLiquidation } from '@/app/applications/staticForms/humanResources/PayrollLiquidation/editPayrollLiquidation'
import { EditPUAutoliq } from '@/app/applications/staticForms/humanResources/PUAutoliq/editPUAutoliq'
import { FormResume } from '@/app/applications/staticForms/humanResources/resume/formResume'

const HumanResourcesRoutes = ({ Route, Routes }) => {
  return (
    <Routes>
      <Route
        path='PUAutoliq'
        element={<PUAutoliq />}
      />
      <Route
        path='PUAutoliq/editPUAutoliq'
        element={<EditPUAutoliq />}
      />
      <Route
        path='PayrollLiquidation'
        element={<PayrollLiquidation />}
      />
      <Route
        path='PayrollLiquidation/editPayrollLiquidation'
        element={<EditPayrollLiquidation />}
      />
      <Route
        path='resume'
        element={<Resume />}
      />
      <Route
        path='resume/formResume'
        element={<FormResume />}
      />
    </Routes>
  )
}

export default HumanResourcesRoutes
