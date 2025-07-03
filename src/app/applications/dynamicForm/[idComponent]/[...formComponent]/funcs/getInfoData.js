import { isEmpty } from '@/lib'
import { getRelatedFilters } from './getRelatedFilters'
import toast from 'react-hot-toast'

export const getInfoData = async ({
  requestType,
  rawQuery,
  replacePlaceholders,
  getDataToRawQuery,
  getDataEdit,
  blockId,
  queryParams,
  relationShips,
  queryParamsPks,
}) => {
  const relatedFilters = getRelatedFilters(relationShips)
  const petitionParams = !isEmpty(relatedFilters) ? relatedFilters : queryParamsPks

  try {
    if (requestType === 'rawQuery') {
      const newRawQuery = replacePlaceholders(rawQuery, { ...queryParamsPks, ...queryParams })
      const result = await getDataToRawQuery({ body: { queryStatement: newRawQuery } })
      return result
    } else {
      const data = {
        blockId,
        data: {},
        where: { ...petitionParams, ...queryParams },
      }
      const result = await getDataEdit({ body: data })
      return result
    }
  } catch (error) {
    toast.error('Error al obtener la información')
    console.error('Error in getInfoData:', error)
  }
}
