import { useEffect, useMemo } from 'react'
import { isEmpty, replacePlaceholders, useMutationDynamicBaseUrl } from '@/lib'
import { useStoreState } from 'easy-peasy'
import useGetDataForm from './useGetDataForm'
import toast from 'react-hot-toast'
import { useLocation } from 'react-router-dom'
import { getRelatedFilters } from '../funcs'

const useGetDataEdit = ({
  processSuccess,
  blockId,
  queryParamsPks,
  companyId,
  formComponent,
  requestType,
  rawQuery,
  isControlBlock,
  isDynamicForm,
  queryParams,
  relationShips,
}) => {
  const userData = useStoreState((state) => state.user.userData)
  const idCompany = companyId ?? userData?.companies?.[0]?.companyId
  const { search } = useLocation()

  const { getDataEdit, isGetDataEditPending } = useGetDataForm({
    idCompany,
    formComponent,
    eventSuccess: processSuccess,
  })

  const { mutateAsync: getDataToRawQuery, isPending: loadingDataToRQ } = useMutationDynamicBaseUrl({
    url: `/oracle/executeQuery`,
    baseKey: 'urlOracleApi',
    isCompanyRequest: true,
    method: 'post',
    onSuccess: (e) => {
      if (e?.success) {
        processSuccess(e)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error)
    },
  })

  const memoizedQueryParamsPks = useMemo(() => queryParamsPks, [queryParamsPks])

  const relatedFilters = useMemo(() => {
    return getRelatedFilters(relationShips)
  }, [relationShips])

  const petitionParams = !isEmpty(relatedFilters) ? relatedFilters : memoizedQueryParamsPks

  const hasUndefinedValues = useMemo(() => {
    if (!memoizedQueryParamsPks) {
      return false
    }
    return Object.values(memoizedQueryParamsPks).some((value) => value === undefined)
  }, [memoizedQueryParamsPks])

  useEffect(() => {
    if (
      (!isEmpty(memoizedQueryParamsPks) && isDynamicForm && !isControlBlock) ||
      (!hasUndefinedValues && !isDynamicForm)
    ) {
      const data = {
        blockId: blockId,
        data: {},
        where: { ...petitionParams, ...(queryParams || {}) },
      }
      if (requestType === 'rawQuery') {
        const newRawQuery = replacePlaceholders(rawQuery, { ...queryParamsPks, ...queryParams })
        getDataToRawQuery({ body: { queryStatement: newRawQuery } })
        return
      }
      getDataEdit({ body: data })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockId, getDataEdit, search, hasUndefinedValues])

  return { getDataEdit, isGetDataEditPending, getDataToRawQuery, loadingDataToRQ }
}

export default useGetDataEdit
