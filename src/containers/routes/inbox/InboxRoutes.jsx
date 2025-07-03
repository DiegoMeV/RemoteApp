import Management from '@/app/inbox/[...ids]/page'
import AdvancedSearch from '@/app/inbox/advancedSearch/page'
import AlertSubmission from '@/app/inbox/alertSubmission/[idGroup]/page'
import FamilyServices from '@/app/inbox/familyServices/page'
import InboxLayout from '@/app/inbox/InboxLayout'
import InfoRequirements from '@/app/inbox/infoRequirements/[idTypeProcess]/page'
import NotesByProcess from '@/app/inbox/notes/[idProcess]/page'
import Inbox from '@/app/inbox/page'
import Registry from '@/app/inbox/registry/[idGroup]/page'
import RegistryContract from '@/app/inbox/registryContract/page'
import RegistryIncomingCorrespondence from '@/app/inbox/RegistryIncomingCorrespondence/page'
import RegistryInternalCorrespondence from '@/app/inbox/RegistryInternalCorrespondence/page'
import RegistryOutgoingCorrespondence from '@/app/inbox/RegistryOutgoingCorrespondence/page'
import RegistryPayContract from '@/app/inbox/registryPayContract/page'
import RegistryPayThird from '@/app/inbox/registryPayThird/page'
import ReqPqrs from '@/app/inbox/reqPqrs/page'
import Requirements from '@/app/inbox/requirements/[idGroup]/page'
import RequirementsUI from '@/app/inbox/requirementsUI/[idGroup]/page'
import AlertsSender from '@/app/inbox/sendsAlerts/page'
import SelectActivity from '@/app/inbox/suggestedActivities/[...ids]/page'
import { ContractualProcessPay } from '@/pages'
import { Actors } from '@/pages/inbox'

const InboxRoutes = ({ Routes, Route }) => {
  return (
    <Routes>
      <Route
        path=''
        element={<InboxLayout />}
      >
        <Route
          path='/'
          element={<Inbox />}
        />
        <Route
          path=':idProcess/:idActivity'
          element={<Management />}
        />
        <Route
          path='advancedSearch'
          element={<AdvancedSearch />}
        />
        <Route
          path='alertSubmission/:idGroup'
          element={<AlertSubmission />}
        />
        <Route
          path='familyServices'
          element={<FamilyServices />}
        />
        <Route
          path='infoRequirements/:idTypeProcess'
          element={<InfoRequirements />}
        />
        <Route
          path='notes/:idProcess'
          element={<NotesByProcess />}
        />
        <Route
          path='registry/:idGroup'
          element={<Registry />}
        />
        <Route
          path='registryContract'
          element={<RegistryContract />}
        />
        <Route
          path='RegistryIncomingCorrespondence'
          element={<RegistryIncomingCorrespondence />}
        />
        <Route
          path='RegistryInternalCorrespondence'
          element={<RegistryInternalCorrespondence />}
        />
        <Route
          path='RegistryOutgoingCorrespondence'
          element={<RegistryOutgoingCorrespondence />}
        />
        <Route
          path='registryPayContract'
          element={<RegistryPayContract />}
        />
        <Route
          path='contractualProcessPay'
          element={<ContractualProcessPay />}
        />
        <Route
          path='registryPayThird'
          element={<RegistryPayThird />}
        />
        <Route
          path='reqPqrs'
          element={<ReqPqrs />}
        />
        <Route
          path='requirements/:idGroup'
          element={<Requirements />}
        />
        <Route
          path='requirementsUI:idGroup'
          element={<RequirementsUI />}
        />
        <Route
          path='sendsAlerts'
          element={<AlertsSender />}
        />
        <Route
          path='suggestedActivities/:idProcess/:idActivity'
          element={<SelectActivity />}
        />
        <Route
          path='suggestedActivities'
          element={<SelectActivity />}
        />
        <Route
          path='actors/:idProcess'
          element={<Actors />}
        />
      </Route>
    </Routes>
  )
}

export default InboxRoutes
