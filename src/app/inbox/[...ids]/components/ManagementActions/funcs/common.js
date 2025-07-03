export const getIdsDocument = (elementAction) => {
  const idDocument =
    elementAction?.activityActionItemData?.documentVersionData?.idDocument ??
    elementAction?.documentData?.id

  const idVersion = elementAction?.activityActionItemData?.documentVersionData?.id
  return { idDocument, idVersion }
}

export const getIdsDocumentToReview = (elementAction) => {
  const idDocument =
    elementAction?.documentToBeHandledData?.id ??
    elementAction?.activityActionItemData?.documentData?.id

  const idVersion = elementAction?.activityActionItemData?.documentVersionData?.id
  return { idDocument, idVersion }
}
