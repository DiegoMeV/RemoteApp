const extractComponentDetails = (dataComponent) => {
  const infoComplete = dataComponent?.data?.[0]?.lastVersionInfo

  const titleComponent = infoComplete?.specification?.title || ''
  const dataBlock = infoComplete?.specification?.dataBlock || []
  const endpointMutation = infoComplete?.crudSpec
  const isMasterDetail = infoComplete?.specification?.isMasterDetail
  const preFormEvent = infoComplete?.specification?.preFormEvent
  const preSubmitEvent = infoComplete?.specification?.preSubmitEvent
  const postSubmitEvent = infoComplete?.specification?.postSubmitEvent
  const dbOrigin = infoComplete?.dbOrigin

  return {
    titleComponent,
    dataBlock,
    endpointMutation,
    isMasterDetail,
    preFormEvent,
    preSubmitEvent,
    postSubmitEvent,
    dbOrigin,
  }
}

export default extractComponentDetails
