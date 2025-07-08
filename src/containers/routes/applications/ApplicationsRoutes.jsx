import EditionActingTypes from '@/app/applications/actingTypes/[Edition]/page'
import ActingTypes from '@/app/applications/actingTypes/page'
import EditAlertMonitoring from '@/app/applications/alertMonitoring/[idAlert]/page'
import AlertMonitoring from '@/app/applications/alertMonitoring/page'
import EditAlert from '@/app/applications/alerts/[edition]/page'
import Alerts from '@/app/applications/alerts/page'
import EditionBlocks from '@/app/applications/blocks/[Edition]/page'
import Blocks from '@/app/applications/blocks/page'
import EditionContractor from '@/app/applications/contractors/[edition]/page'
import Contractors from '@/app/applications/contractors/page'
import ContractRegistry from '@/app/applications/contractRegistry/page'
import EditionContracts from '@/app/applications/contracts/[Edition]/page'
import Contracts from '@/app/applications/contracts/page'
import ContractSource from '@/app/applications/contractSource/page'
import EditionTypeContract from '@/app/applications/contractsTypes/[edition]/page'
import ContractsTypes from '@/app/applications/contractsTypes/page'
import EditionCriteria from '@/app/applications/criteria/[Edition]/page'
import Criteria from '@/app/applications/criteria/page'
import DashboardPage from '@/app/applications/dashboard/page'
import EditionResource from '@/app/applications/domains/[subpage]/[Edition]/page'
import SubPagesDomains from '@/app/applications/domains/[subpage]/page'
import FormComponent from '@/app/applications/dynamicForm/[idComponent]/[...formComponent]/page'
import IdComponent from '@/app/applications/dynamicForm/[idComponent]/page'
import EditionEntity from '@/app/applications/entities/[Edition]/page'
import Entities from '@/app/applications/entities/page'
import InformationSources from '@/app/applications/informationSources/page'
import LayoutApplication from '@/app/applications/LayoutApplication'
import EditionModel from '@/app/applications/models/[edition]/page'
import Models from '@/app/applications/models/page'
import Applications from '@/app/applications/page'
import IdApplication from '@/app/applications/process/[idApplication]/page'
import EditionGroup from '@/app/applications/process/editProcessTypeGroups/[...ids]/page'
import EditionProcessTypes from '@/app/applications/process/editTypeProcess/[...ids]/page'
import ProcessTypes from '@/app/applications/process/tiposDeProcesos/[idGroup]/page'
import RegisterEntities from '@/app/applications/registerEntities/page'
import RequestPage from '@/app/applications/request/page'
import EditionResultTypes from '@/app/applications/resultTypes/[Edition]/page'
import ResultTypes from '@/app/applications/resultTypes/page'
import RethusRegistry from '@/app/applications/rethusRegistry/page'
import EditSendAlerts from '@/app/applications/sendAlerts/[edition]/page'
import SendAlerts from '@/app/applications/sendAlerts/page'
import Members from '@/app/applications/teams/[Edition]/members/page'
import EditionTeam from '@/app/applications/teams/[Edition]/page'
import Teams from '@/app/applications/teams/page'
import TreasuryByGroup from '@/app/applications/treasury/[idGroup]/page'
import Treasury from '@/app/applications/treasury/page'
import EditionCity from '@/app/applications/ubication/cities/[Edition]/page'
import Cities from '@/app/applications/ubication/cities/page'
import EditionProvince from '@/app/applications/ubication/province/[Edition]/page'
import Province from '@/app/applications/ubication/province/page'
import EditionRegion from '@/app/applications/ubication/regions/[Edition]/page'
import Regions from '@/app/applications/ubication/regions/page'
import EditionSatellite from '@/app/applications/ubication/satellite/[Edition]/page'
import Satellite from '@/app/applications/ubication/satellite/page'
import RegistryAri from '@/app/applications/uri/compromise/[compromiseUri]/[idGroup]/page'
import CompromiseUri from '@/app/applications/uri/compromise/[compromiseUri]/page'
import Engagement from '@/app/applications/uri/compromise/page'
import Records from '@/app/applications/uri/records/page'
import RegistryUri from '@/app/applications/uri/registryUri/page'
import MesasUri from '@/app/applications/uri/tables/[mesasUri]/page'
import Tables from '@/app/applications/uri/tables/page'
import UriDashboard from '@/app/applications/uri/uriDashboard/page'
import EditionVariables from '@/app/applications/variables/[Edition]/page'
import Variables from '@/app/applications/variables/page'
import EditionVariablesContract from '@/app/applications/variablesContract/[Edition]/page'
import VariablesContract from '@/app/applications/variablesContract/page'
import { ViewHierarchy } from '@/lib'
import { StaticForms } from './staticForms'
import { AssigmentPaymentOrder } from '@/app/applications/assigmentPaymentOrder'
import TransferExpedients from '@/app/applications/TransferExpedients/page'
import { PaymentOrdersReportsDates } from '@/app/applications/expenseManagementModule'
import { Route, Routes } from 'react-router-dom'

const ApplicationsRoutes = () => {
  return (
    <Routes>
      <Route
        path=''
        element={<LayoutApplication />}
      >
        <Route
          path='/'
          element={<Applications />}
        />
        <Route
          path='TransferExpedients'
          element={<TransferExpedients />}
        />
        <Route
          path='expenseManagementModule/reports/PaymentOrdersReportsDates'
          element={<PaymentOrdersReportsDates />}
        />
        <Route
          path='assigmentPaymentOrder'
          element={<AssigmentPaymentOrder />}
        />
        <Route
          path='actingTypes'
          element={<ActingTypes />}
        />
        <Route
          path='actingTypes/:idEdition'
          element={<EditionActingTypes />}
        />
        <Route
          path='alertMonitoring'
          element={<AlertMonitoring />}
        />
        <Route
          path='alertMonitoring/:idAlert'
          element={<EditAlertMonitoring />}
        />
        <Route
          path='alerts'
          element={<Alerts />}
        />
        <Route
          path='alerts/:idAlert'
          element={<EditAlert />}
        />
        <Route
          path='blocks'
          element={<Blocks />}
        />
        <Route
          path='blocks/:idEdition'
          element={<EditionBlocks />}
        />
        <Route
          path='contractors'
          element={<Contractors />}
        />
        <Route
          path='contractors/:idEdition'
          element={<EditionContractor />}
        />
        <Route
          path='contractRegistry'
          element={<ContractRegistry />}
        />
        <Route
          path='contracts'
          element={<Contracts />}
        />
        <Route
          path='contracts/:idEdition'
          element={<EditionContracts />}
        />
        <Route
          path='contractSource'
          element={<ContractSource />}
        />
        <Route
          path='contractsTypes'
          element={<ContractsTypes />}
        />
        <Route
          path='contractsTypes/:idEdition'
          element={<EditionTypeContract />}
        />
        <Route
          path='criteria'
          element={<Criteria />}
        />
        <Route
          path='criteria/:idEdition'
          element={<EditionCriteria />}
        />
        <Route
          path='dashboard'
          element={<DashboardPage />}
        />
        <Route
          path='dependencias'
          element={<ViewHierarchy />}
        />
        <Route
          path='domains/:subpage'
          element={<SubPagesDomains />}
        />
        <Route
          path='domains/:subpage/:idEdition'
          element={<EditionResource />}
        />
        <Route
          path='/dynamicForm/:idForm'
          element={<IdComponent />}
        />
        <Route
          path='/dynamicForm/:idForm/:formComponent/:idApplication'
          element={<FormComponent />}
        />
        <Route
          path='entities'
          element={<Entities />}
        />
        <Route
          path='entities/:idEdition'
          element={<EditionEntity />}
        />
        <Route
          path='informationSources'
          element={<InformationSources />}
        />
        <Route
          path='models'
          element={<Models />}
        />
        <Route
          path='models/:idEdition'
          element={<EditionModel />}
        />
        <Route
          path='process/:idApplication'
          element={<IdApplication />}
        />
        <Route
          path='process/editProcessTypeGroups/:idApplication/:idGroup'
          element={<EditionGroup />}
        />
        <Route
          path='process/editTypeProcess/:idGroup/:idProcessType'
          element={<EditionProcessTypes />}
        />
        <Route
          path='process/tiposDeProcesos/:idGroup'
          element={<ProcessTypes />}
        />

        <Route
          path='registerEntities'
          element={<RegisterEntities />}
        />
        <Route
          path='request'
          element={<RequestPage />}
        />
        <Route
          path='resultTypes'
          element={<ResultTypes />}
        />
        <Route
          path='resultTypes/:idEdition'
          element={<EditionResultTypes />}
        />
        <Route
          path='rethusRegistry'
          element={<RethusRegistry />}
        />
        <Route
          path='sendAlerts'
          element={<SendAlerts />}
        />
        <Route
          path='sendAlerts/:idEdition'
          element={<EditSendAlerts />}
        />
        <Route
          path='staticForms/*'
          element={
            <StaticForms
              Route={Route}
              Routes={Routes}
            />
          }
        />
        <Route
          path='teams'
          element={<Teams />}
        />
        <Route
          path='teams/:idEdition'
          element={<EditionTeam />}
        />
        <Route
          path='teams/:idEdition/members'
          element={<Members />}
        />
        <Route
          path='treasury'
          element={<Treasury />}
        />
        <Route
          path='treasury'
          element={<Treasury />}
        />
        <Route
          path='treasury/:idGroup'
          element={<TreasuryByGroup />}
        />
        <Route
          path='ubication/cities'
          element={<Cities />}
        />
        <Route
          path='ubication/cities/:idEdition'
          element={<EditionCity />}
        />
        <Route
          path='ubication/province'
          element={<Province />}
        />
        <Route
          path='ubication/province/:idEdition'
          element={<EditionProvince />}
        />
        <Route
          path='ubication/regions'
          element={<Regions />}
        />
        <Route
          path='ubication/regions/:idEdition'
          element={<EditionRegion />}
        />
        <Route
          path='ubication/satellite'
          element={<Satellite />}
        />
        <Route
          path='ubication/satellite/:idEdition'
          element={<EditionSatellite />}
        />
        <Route
          path='uri/compromise'
          element={<Engagement />}
        />
        <Route
          path='uri/compromise/:compromiseUri'
          element={<CompromiseUri />}
        />
        <Route
          path='uri/compromise/:compromiseUri/:idGroup'
          element={<RegistryAri />}
        />
        <Route
          path='uri/records'
          element={<Records />}
        />
        <Route
          path='uri/registryUri'
          element={<RegistryUri />}
        />
        <Route
          path='uri/tables'
          element={<Tables />}
        />
        <Route
          path='uri/tables/:mesasUri'
          element={<MesasUri />}
        />
        <Route
          path='uri/uriDashboard'
          element={<UriDashboard />}
        />
        <Route
          path='variables'
          element={<Variables />}
        />
        <Route
          path='variables/:idEdition'
          element={<EditionVariables />}
        />
        <Route
          path='variablesContract'
          element={<VariablesContract />}
        />
        <Route
          path='variablesContract/:idEdition'
          element={<EditionVariablesContract />}
        />
      </Route>
    </Routes>
  )
}

export default ApplicationsRoutes
