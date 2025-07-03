import { formatToLocaleDate } from '@/lib'

export const fieldValues = (elementAction) => {
  return {
    type: elementAction?.ActionItemRel?.name ?? '',
    documentName:
      elementAction?.documentToBeHandledData?.name ??
      elementAction?.activityActionItemData?.documentData?.name ??
      '',
    generationDate: formatToLocaleDate(
      elementAction?.documentToBeHandledData?.createdAt ??
        elementAction?.activityActionItemData?.documentData?.createdAt
    ),
    status:
      elementAction?.documentToBeHandledData?.status ??
      elementAction?.activityActionItemData?.documentData?.status ??
      '',
  }
}

export const conditionRenderOptions = (elementAction) => {
  return elementAction?.activityActionItemData?.id || elementAction?.documentToBeHandledData?.id
    ? true
    : false
}
