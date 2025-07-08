import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
// import { AdministrationRoutes } from './administration'
import { LoginRoutes } from './loginRoutes'
import SelectCompany from '@/app/selectCompany/page'
import GeneralLayout from '@/app/GeneralLayout'
import Dashboard from '@/app/dashboard/page'
import { AdministrationRoutes } from './administration'
import Builder from '@/app/builder/[idProcessType]/page'
import { InboxRoutes } from './inbox'
import { AuditRoutes } from './audit'
import FiscalBuilder from '@/app/fiscalBuilder/[idProcessType]/page'
import Home from '@/app/home/page'
import Sso from '@/app/nubepublica/sso/page'
import QrDoc from '@/app/qrDocView/page'
import RequestedDataPage from '@/app/requestedDataPage/page'
import Rethus from '@/app/rethus/[...idCompany]/page'
import { AppsByCompany, Companies } from '@/app/companies'
import { useStoreState } from 'easy-peasy'
import EditionCompany from '@/app/companies/edition/[idCompany]/page'
import Login from '@/app/page'
import MyAccount from '@/pages/myaccount/page'
import { PqrsdfRoutes } from './pqrsdf'
import { ApplicationsRoutes } from './applications'
// import { InboxRoutes } from './inbox'

const RouterRoutes = () => {
  const { token } = useStoreState((state) => state.token.tokenData || {})
  const userData = useStoreState((state) => state.user.userData)
  const companyData = useStoreState((state) => state.company.companyData)

  const routes = [
    { condition: !token, element: <Login /> },
    {
      condition: !companyData || !userData,
      element: (
        <Navigate
          to='/selectCompany'
          replace
        />
      ),
    },
    {
      condition: true,
      element: (
        <Navigate
          to='/dashboard'
          replace
        />
      ),
    },
  ]

  const RouteValidation = () => routes.find((route) => route.condition).element

  const superSayayin = userData?.superSaiyayin

  return (
    <Router>
      <Routes>
        <Route
          path='/'
          element={<GeneralLayout />}
        >
          <Route
            index
            element={RouteValidation()}
          />

          <Route
            path='*'
            element={
              <LoginRoutes
                Route={Route}
                Routes={Routes}
              />
            }
          />

          <Route
            path='administration/*'
            element={
              <AdministrationRoutes
                Route={Route}
                Routes={Routes}
              />
            }
          />
          <Route
            path='pqrsdf/:id/*'
            element={
              <PqrsdfRoutes
                Route={Route}
                Routes={Routes}
              />
            }
          />
          <Route
            path='builder/:idProcessType'
            element={<Builder />}
          />
          <Route
            path='dashboard'
            element={<Dashboard />}
          />
          <Route
            path='fiscalBuilder/:idProcessType'
            element={<FiscalBuilder />}
          />
          <Route
            path='home'
            element={<Home />}
          />
          <Route
            path='myaccount'
            element={<MyAccount />}
          />
          <Route
            path='nubepublica/sso'
            element={<Sso />}
          />
          <Route
            path='qrDocView'
            element={<QrDoc />}
          />
          <Route
            path='requestedDataPage'
            element={<RequestedDataPage />}
          />
          <Route
            path='rethus/:idCompany/:idProcess'
            element={<Rethus />}
          />

          {superSayayin && (
            <>
              <Route
                path='companies'
                element={<Companies />}
              />
              <Route
                path='companies/:idCompany'
                element={<AppsByCompany />}
              />
              <Route
                path='companies/edition/:idCompany'
                element={<EditionCompany />}
              />
            </>
          )}
          <Route
            path='selectCompany'
            element={<SelectCompany />}
          />

          <Route
            path='applications/*'
            element={
              <ApplicationsRoutes
                Route={Route}
                Routes={Routes}
              />
            }
          />

          <Route
            path='inbox/*'
            element={
              <InboxRoutes
                Route={Route}
                Routes={Routes}
              />
            }
          />
          <Route
            path='audit/*'
            element={
              <AuditRoutes
                Route={Route}
                Routes={Routes}
              />
            }
          />
        </Route>
      </Routes>
    </Router>
  )
}

export default RouterRoutes
