import Debts from '@/app/applications/staticForms/incomes/debts/Debts'
import { FormDebt } from '@/app/applications/staticForms/incomes/debts/formDebt'

const IncomesRoutes = ({ Route, Routes }) => {
  return (
    <Routes>
      <Route
        path='debts'
        element={<Debts />}
      />
      <Route
        path='debts/formDebt'
        element={<FormDebt />}
      />
    </Routes>
  )
}

export default IncomesRoutes
