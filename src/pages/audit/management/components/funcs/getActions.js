import {
  DocumentGeneration,
  DocumentSignature,
  SaveForm,
  DocumentUpload,
  DocumentDownload,
  NumberingDocument,
  Notification,
  CallApi,
} from '../ManagementActions'

export const ACTION_TYPES_FISCAL = [
  'AUTOMATIC_ACTION',
  'CALL_COMPONENT',
  'CALL_API',
  'REVIEW_STORED_DATA',
  'REVIEW_RAD_DATA',
]

export const actionComponents = {
  SAVE_FORM: (props) => <SaveForm {...props} />,
  GENERATE_DOCUMENT: (props) => <DocumentGeneration {...props} />,
  // REVIEW_DOCUMENT: (props) => <DocumentReview {...props} />,
  SIGN_DOCUMENT: (props) => <DocumentSignature {...props} />,
  // ASSIGNMENT_TO_USER: (props) => <DocumentAssignment {...props} />,
  // ADD_PROCESS_ACTOR: (props) => <DocumentAddProcessActor {...props} />,
  // SUBPROCESS: (props) => <SubProcessAccordion {...props} />,
  DOWNLOAD_DOCUMENT: (props) => <DocumentDownload {...props} />,
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
  // REVIEW_NOTIFICATION: (props) => (
  //   <Notification
  //     {...props}
  //     type='REVIEW'
  //   />
  // ),
  NUMBERING_DOCUMENT: (props) => <NumberingDocument {...props} />,
  // GENERAL_REVIEW: (props) => <GeneralReview {...props} />,
  // CALL_ORACLE_FORM: (props) => <DownloadOracleForm {...props} />,
  // PAY_ORDER_APPROVAL: (props) => <PayOrdersApproval {...props} />,
  CALL_API: (props) => <CallApi {...props} />,
}

export const doubleActions = {
  UPLOAD_DOCUMENT: (props) => <DocumentUpload {...props} />,
}
