import { persist } from 'easy-peasy'
import { userModel } from './userModel'
import { darkModel } from './darkModel'
import { companyModel } from './companyModel'
import { stateSideBarModel } from './stateSideBarModel'
import { reactFlowStateModel } from './reactFlowStateModel'
import { infoFlowModel } from './infoFlowModel'
import { stateOrientationModel } from './stateOrientationModel'
import { stateSideBarAdminModel } from './stateSideBarAdminModel'
import { menuModel } from './menuModel'
import { searchTextInboxModel } from './searchTextInbox'
import { confirmAlertModel } from './confirmAlertModel'
import { tokenModel } from './tokenModel'
import { menuModulesModel } from './menuModulesModel'
import { previewerModel } from './previewerModel'
import { nameRolOrChargeModel } from './nameRolOrCharge'
import { backPathUrl } from './backPathUrl'
import { moduleTypeSelected } from './moduleTypeSelected'
import { sessionAzureModel } from './sessionAzureModel'
import { modalFuncs } from './modalFuncs'
import { valuesListModel } from './valuesListModel'
import { userParameterModel } from './userParameterModel'
import { paymentOrdersModel } from './paymentOrdersModel'
import { isDirtyForm } from './isDirtyForm'
import { newValueListModel } from './newValueListModel'
import { jobStatusModel } from './jobStatusModel'
import { additionalUserInfoModel } from './additionalUserInfo'

export const rootModel = {
  token: persist(tokenModel, { storage: 'localStorage' }),
  user: persist(userModel, { storage: 'localStorage' }),
  userParameter: persist(userParameterModel, { storage: 'localStorage' }),
  darkTheme: persist(darkModel, { storage: 'localStorage' }),
  company: persist(companyModel, { storage: 'localStorage' }),
  jobStatusModel: persist(jobStatusModel),
  infoFlowState: persist(infoFlowModel),
  stateSideBar: persist(stateSideBarModel),
  reactFlowState: persist(reactFlowStateModel),
  stateOrientation: persist(stateOrientationModel),
  stateSideBarAdmin: persist(stateSideBarAdminModel),
  confirmAlert: persist(confirmAlertModel),
  menu: persist(menuModel),
  menuModules: persist(menuModulesModel),
  previewer: previewerModel,
  searchText: persist(searchTextInboxModel),
  sessionAzure: persist(sessionAzureModel),
  nameRolOrCharge: persist(nameRolOrChargeModel),
  moduleTypeSelected: persist(moduleTypeSelected),
  backPathUrl: persist(backPathUrl),
  modalFuncs: persist(modalFuncs),
  paymentOrdersModel: persist(paymentOrdersModel),
  isDirtyForm: isDirtyForm,
  valueList: valuesListModel,
  newValueList: newValueListModel,
  additionalUserInfo: persist(additionalUserInfoModel),
}
