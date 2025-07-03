import {
  Save,
  AddLinkOutlined,
  ApprovalOutlined,
  AssignmentIndOutlined,
  AssignmentOutlined,
  AssignmentReturnOutlined,
  ConnectWithoutContactOutlined,
  DeleteOutlined,
  DownloadForOfflineOutlined,
  DriveFileRenameOutline,
  DvrOutlined,
  EditNotificationsOutlined,
  EmailOutlined,
  FileUploadOutlined,
  FindInPageOutlined,
  GradingOutlined,
  LeakAddOutlined,
  LoopOutlined,
  MoveUpOutlined,
  NotificationAddOutlined,
  NumbersOutlined,
  PostAddOutlined,
  PriceCheckOutlined,
  RecentActorsOutlined,
  ViewTimelineOutlined,
  RateReviewOutlined,
} from '@mui/icons-material'
import ElementGeneralReview from '../components/ElementGeneralReview'

import {
  // ElementSaveForm,
  ElementUpload,
  ElementCallApi,
  ElementDocuments,
  ElementAssignment,
  ElementSubProcess,
  ElementOracleForm,
  ElementNotification,
  ElementCreateSigedoc,
  ElementProcessTransfer,
  ElementAutomaticAction,
  ElementDocumentGeneration,
  ElementFinantialDocSiifweb,
} from '../components/Actions'
import { MagicString } from '@/libV4'
import { ElementForm } from '../components'

/**
 * iconsForAccordion defines icons to be rendered in the AccordionGeneralReview component.
 */
export const iconsForAccordion = {
  SAVE_FORM: AssignmentOutlined,
  UPLOAD_DOCUMENT: FileUploadOutlined,
  ADD_PROCESS_ACTOR: RecentActorsOutlined,
  ASSIGNMENT_TO_USER: AssignmentIndOutlined,
  GENERATE_DOCUMENT: PostAddOutlined,
  SIGN_DOCUMENT: DriveFileRenameOutline,
  NUMBERING_DOCUMENT: NumbersOutlined,
  CREATE_NOTIFICATION: NotificationAddOutlined,
  REVIEW_DOCUMENT: RateReviewOutlined,
  REVIEW_NOTIFICATION: EditNotificationsOutlined,
  GENERAL_REVIEW: ApprovalOutlined,
  SEND_NOTIFICATION: EmailOutlined,
  CALL_API: DvrOutlined,
  CREATE_SIGEDOC: ConnectWithoutContactOutlined,
  REVIEW_RAD_DATA: GradingOutlined,
  AUTOMATIC_ACTION: LoopOutlined,
  CALL_ORACLE_FORM: AddLinkOutlined,
  PAY_ORDER_APPROVAL: PriceCheckOutlined,
  SIIFWEB_BIND_FINANTIAL_DOC: FindInPageOutlined,
  PROCESS_TRANSFER: MoveUpOutlined,
  BIND_PROCESSES: LeakAddOutlined,
  SUBPROCESS: ViewTimelineOutlined,
  DOWNLOAD_DOCUMENT: DownloadForOfflineOutlined,
  BACK_TO_PREV_ACTIVITY: AssignmentReturnOutlined,
  ALERTS_REVIEW: PostAddOutlined,
  default: () => <></>,
}

/**
 * elementForAction defines components for actions in the AccordionGeneralReview component.
 */
export const elementForAction = {
  // SAVE_FORM: ElementSaveForm,
  SAVE_FORM: ElementForm,
  CALL_API: ElementCallApi,
  UPLOAD_DOCUMENT: ElementUpload,
  PAY_ORDER_APPROVAL: ElementCallApi,
  ASSIGNMENT_TO_USER: ElementAssignment,
  BACK_TO_PREV_ACTIVITY: ElementAssignment,
  ADD_PROCESS_ACTOR: ElementAssignment,
  REVIEW_DOCUMENT: ElementDocuments,
  SIGN_DOCUMENT: ElementDocuments,
  DOWNLOAD_DOCUMENT: ElementDocuments,
  NUMBERING_DOCUMENT: ElementDocuments,
  SUBPROCESS: ElementSubProcess,
  BIND_PROCESSES: ElementSubProcess,
  GENERAL_REVIEW: ElementGeneralReview,
  REVIEW_RAD_DATA: ElementGeneralReview,
  SEND_NOTIFICATION: ElementNotification,
  REVIEW_NOTIFICATION: ElementNotification,
  CREATE_NOTIFICATION: ElementNotification,
  CALL_ORACLE_FORM: ElementOracleForm,
  CREATE_SIGEDOC: ElementCreateSigedoc,
  AUTOMATIC_ACTION: ElementAutomaticAction,
  PROCESS_TRANSFER: ElementProcessTransfer,
  GENERATE_DOCUMENT: ElementDocumentGeneration,
  SIIFWEB_BIND_FINANTIAL_DOC: ElementFinantialDocSiifweb,
  ALERTS_REVIEW: <div></div>,
  default: () => <div></div>,
}

// Pasar a un archivo de constantes
export const channelOptions = [
  { value: 'SMS', label: 'SMS' },
  { value: 'EMAIL', label: 'EMAIL' },
]

export const convertObjToArr = ({ obj }) => {
  return Object.entries(obj ?? {}).map(([key, value]) => {
    return { label: key, value }
  })
}

export const keyValueArr = (arr = []) => {
  return arr?.reduce((acc, element) => {
    acc[element.label] = element.value
    return acc
  }, {})
}

export const proveValueNotNull = (arr) => {
  return arr.every((item) => item?.value !== '' && item?.label !== '')
}

// TO-DO: Start to use this function

/**
 * Create the action buttons for each actionItem, the save info and the delete actionItem
 * @param {Object} element - The object of element to delete
 * @param {Object} action - The object of the current action
 * @param {Function} handleDelete - This make the request to delete the current actionItem
 */
export const actionButtons = ({ element = {}, action = {}, handleDelete = () => {} } = {}) => {
  return [
    {
      type: 'submit',
      icon: <Save />,
      title: MagicString.CONSTRUCTOR.SAVE_ELEMENT,
    },
    {
      hoverColor: 'red',
      icon: <DeleteOutlined />,
      title: MagicString.CONSTRUCTOR.DELETE_ELEMENT,
      onClick: () => handleDelete(action, element),
    },
  ]
}

// TO-DO: Start to use this function
// export const actionsModal = ({ modal }) => {
//   return [
//     {
//       label: 'Cancelar',
//       onClick: modal?.handleShow,
//       color: 'secondary',
//     },
//     {
//       label: 'Guardar',
//       type: 'submit',
//     },
//   ]
// }
