export const dataForCommentReview = (activityInfo) => {
  const approvedComent =
    activityInfo?.[0]?.returningActivityData?.activityData?.approvedData?.comment
  const rejectedComent =
    activityInfo?.[0]?.returningActivityData?.activityData?.rejectedData?.comment
  const askForDocsComent =
    activityInfo?.[0]?.returningActivityData?.activityData?.askForDocs?.comment
  const someCommentExist = !!approvedComent || !!rejectedComent || !!askForDocsComent

  const color =
    !!rejectedComent || !!askForDocsComent ? 'error' : approvedComent ? 'success' : 'primary'

  const label = rejectedComent
    ? 'de rechazo'
    : askForDocsComent
    ? 'para solicitar documentos'
    : approvedComent
    ? 'de aprobación'
    : ''
  return { approvedComent, rejectedComent, askForDocsComent, someCommentExist, color, label }
}
