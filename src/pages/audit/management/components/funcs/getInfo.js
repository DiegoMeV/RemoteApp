import { formatToLocaleDate } from '@/lib'

export const getDisplayedValues = (elementAction) => {
  return {
    status:
      elementAction?.activityActionItemData?.documentData?.status === 'ANULADO'
        ? ''
        : elementAction?.activityActionItemData?.documentData?.status ?? '',
    createdAt:
      elementAction?.activityActionItemData?.documentData?.status === 'ANULADO'
        ? ''
        : elementAction?.activityActionItemData?.documentData?.createdAt
        ? formatToLocaleDate(elementAction?.activityActionItemData?.documentData?.createdAt)
        : '',
  }
}

export const getdDisplayedValuesForce = (elementAction) => {
  const status = elementAction?.activityActionItemData?.documentData?.status ?? ''
  const createdAt =
    formatToLocaleDate(elementAction?.activityActionItemData?.documentData?.createdAt) ?? ''
  return { status, createdAt }
}
