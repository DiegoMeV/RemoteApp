import {
  DocumentGeneration,
  DocumentReview,
  DocumentSignature,
  SaveForm,
  DocumentUpload,
  DocumentAssignment,
  SubProcessAccordion,
  DocumentDownload,
  AlertsReview,
  DocumentAddProcessActor,
  NumberingDocument,
  GeneralReview,
  Notification,
  CreateSIGEDOC,
  DownloadOracleForm,
  CallApi,
  PayOrdersApproval,
  BindProcesses,
  BackToPrevActivity,
} from '../ManagementActions'

export const actionComponents = {
  SAVE_FORM: (props) => <SaveForm {...props} />,
  BIND_PROCESSES: (props) => <BindProcesses {...props} />,
  GENERATE_DOCUMENT: (props) => <DocumentGeneration {...props} />,
  REVIEW_DOCUMENT: (props) => <DocumentReview {...props} />,
  SIGN_DOCUMENT: (props) => <DocumentSignature {...props} />,
  ASSIGNMENT_TO_USER: (props) => <DocumentAssignment {...props} />,
  ADD_PROCESS_ACTOR: (props) => <DocumentAddProcessActor {...props} />,
  SUBPROCESS: (props) => <SubProcessAccordion {...props} />,
  DOWNLOAD_DOCUMENT: (props) => <DocumentDownload {...props} />,
  ALERTS_REVIEW: (props) => <AlertsReview {...props} />,
  BACK_TO_PREV_ACTIVITY: (props) => <BackToPrevActivity {...props} />,
  SEND_NOTIFICATION: (props) => (
    <Notification
      {...props}
      type='SEND'
    />
  ),
  CREATE_NOTIFICATION: (props) => (
    <Notification
      {...props}
      type='CREATE'
    />
  ),
  REVIEW_NOTIFICATION: (props) => (
    <Notification
      {...props}
      type='REVIEW'
    />
  ),
  NUMBERING_DOCUMENT: (props) => <NumberingDocument {...props} />,
  GENERAL_REVIEW: (props) => <GeneralReview {...props} />,
  CREATE_SIGEDOC: (props) => <CreateSIGEDOC {...props} />,
  CALL_ORACLE_FORM: (props) => <DownloadOracleForm {...props} />,
  PAY_ORDER_APPROVAL: (props) => <PayOrdersApproval {...props} />,
  CALL_API: (props) => <CallApi {...props} />,
}

export const doubleActions = {
  UPLOAD_DOCUMENT: (props) => <DocumentUpload {...props} />,
}
