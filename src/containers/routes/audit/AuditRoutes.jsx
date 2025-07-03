import ProcessTypes from '@/app/administration/fiscalGroupProcess/[idGroup]/page'
import ProcessGroup from '@/app/administration/fiscalGroupProcess/page'
import AuditLayout from '@/app/audit/AuditLayout'
import BasicData from '@/app/audit/expedient/basicData/page'
import EndogenCreate from '@/app/audit/expedient/endogens/create/page'
import Endogens from '@/app/audit/expedient/endogens/page'
import ExogenCreate from '@/app/audit/expedient/exogens/create/page'
import Exogens from '@/app/audit/expedient/exogens/page'
import EditionGroup from '@/app/audit/fiscalGroupProcess/edit/[...ids]/page'
import EditionTypeProcess from '@/app/audit/fiscalGroupProcess/editTypeProcess/[...ids]/page'
import MassiveExpedientsCreate from '@/app/audit/massiveManagement/expedients/create/page'
import MassiveExpedients from '@/app/audit/massiveManagement/expedients/page'
import MassiveGuidesCreate from '@/app/audit/massiveManagement/guides/create/page'
import MassiveGuides from '@/app/audit/massiveManagement/guides/page'
import NotifyById from '@/app/audit/notify/notifyById/page'
import Notify from '@/app/audit/notify/page'
import {
  AdvancedSearch,
  AuditDashboard,
  AuditManagement,
  NotesByProcess,
  SubmittedFiles,
} from '@/pages'

const AuditRoutes = ({ Routes, Route }) => {
  return (
    <Routes>
      <Route
        path=''
        element={<AuditLayout />}
      >
        <Route
          path='advancedSearch'
          element={<AdvancedSearch />}
        />
        <Route
          path='notes/:idProcess'
          element={<NotesByProcess />}
        />
        <Route
          path='dashboard'
          element={<AuditDashboard />}
        />
        <Route
          path='expedient/basicData'
          element={<BasicData />}
        />
        <Route
          path='expedient/endogens'
          element={<Endogens />}
        />
        <Route
          path='expedient/endogens/create'
          element={<EndogenCreate />}
        />
        <Route
          path='expedient/exogens'
          element={<Exogens />}
        />
        <Route
          path='expedient/exogens/create'
          element={<ExogenCreate />}
        />
        <Route
          path='massiveManagement/expedients'
          element={<MassiveExpedients />}
        />
        <Route
          path='massiveManagement/expedients/create'
          element={<MassiveExpedientsCreate />}
        />
        <Route
          path='massiveManagement/guides'
          element={<MassiveGuides />}
        />
        <Route
          path='massiveManagement/guides/create'
          element={<MassiveGuidesCreate />}
        />
        <Route
          path='fiscalGroupProcess'
          element={<ProcessGroup />}
        />
        <Route
          path='fiscalGroupProcess/:idGroup'
          element={<ProcessTypes />}
        />
        <Route
          path='fiscalGroupProcess/edit/:idGroup'
          element={<EditionGroup />}
        />
        <Route
          path='fiscalGroupProcess/editTypeProcess/:idGroup/:idProcessType'
          element={<EditionTypeProcess />}
        />
        <Route
          path='notify'
          element={<Notify />}
        />
        <Route
          path='notify/:idNotify'
          element={<NotifyById />}
        />
        <Route
          path='reports/magneticMedia/submittedFiles'
          element={<SubmittedFiles />}
        />
      </Route>
      <Route
        path='management/:idProcess'
        element={<AuditManagement />}
      />
    </Routes>
  )
}

export default AuditRoutes
