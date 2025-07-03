import PresupuestalRoutes from './presupuestal/PresupuestalRoutes'
import HumanResourcesRoutes from './humanResources/HumanResourcesRoutes'
import { AgreementRoutes } from './agreements'
import IncomesRoutes from './incomes/IncomesRoutes'
import {
  OrdenPagoDirecta,
  OrdenPagoDirectaList,
} from '@/app/applications/staticForms/paymentOrders/ordenPagoDirecta'
import {
  OrdenPagoUnica,
  OrdenPagoUnicaList,
} from '@/app/applications/staticForms/paymentOrders/ordenPagoUnica'

const StaticForms = ({ Route, Routes }) => {
  return (
    <Routes>
      <Route
        path='/paymentOrders/ordenPagoUnica'
        element={<OrdenPagoUnicaList />}
      />
      <Route
        path='/paymentOrders/ordenPagoUnica/form'
        element={<OrdenPagoUnica />}
      />
      <Route
        path='/paymentOrders/ordenPagoDirecta'
        element={<OrdenPagoDirectaList />}
      />
      <Route
        path='/paymentOrders/ordenPagoDirecta/form'
        element={<OrdenPagoDirecta />}
      />
      <Route
        path='/humanResources/*'
        element={
          <HumanResourcesRoutes
            Route={Route}
            Routes={Routes}
          />
        }
      />
      <Route
        path='/incomes/*'
        element={
          <IncomesRoutes
            Route={Route}
            Routes={Routes}
          />
        }
      />
      <Route
        path='/presupuestal/*'
        element={
          <PresupuestalRoutes
            Route={Route}
            Routes={Routes}
          />
        }
      />
      <Route
        path='/agreements/*'
        element={
          <AgreementRoutes
            Route={Route}
            Routes={Routes}
          />
        }
      />
    </Routes>
  )
}

export default StaticForms
