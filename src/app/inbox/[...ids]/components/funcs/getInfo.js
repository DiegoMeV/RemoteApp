import { formatToLocaleDate } from '@/lib'
import { toArray } from '@/libV4'

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

export const sortByPosition = (data) => {
  return toArray(data)?.sort((a, b) => (Number(a?.position) || 0) - (Number(b?.position) || 0))
}
