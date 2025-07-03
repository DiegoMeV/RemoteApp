import { useLocation, useNavigate } from 'react-router-dom'
import { useQueryClient } from '@tanstack/react-query'
import { FormView } from '../components'
import { useGetDataEdit, useOnSubmitForm } from '../hooks'
import { useEffect } from 'react'
import { isEmpty } from '@/lib'
import { isDateFormat, MagicString } from '@/libV4'

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

dayjs.extend(utc)

const Form = ({
  block,
  idForm,
  idApplication,
  form,
  queryParamsPks,
  queryParams,
  companyId,
  formComponent,
  nit_compania,
  isDirectForm,
  isDynamicForm,
  masterBlock,
}) => {
  const blockId = block?.blockId
  const requestType = block?.dataSource
  const rawQuery = block?.rawQuery
  const isControlBlock = block?.isControlBlock ?? false
  const isMasterBlock = blockId === masterBlock
  const blockEvents = block?.events ?? []
  const items = block?.items
  const relationShips = block?.relationShips ?? []

  const navigation = useNavigate()
  const location = useLocation()
  const queryClient = useQueryClient()

  const importData = (e) => {
    const infoData = e?.data?.[0]
    if (infoData !== undefined) {
      items?.forEach((input) => {
        if (infoData[input?.id] !== null && infoData[input?.id] !== '') {
          if (input?.elementType === 'date') {
            form.setValue(
              `${blockId}.${input?.id}`,
              dayjs
                .utc(infoData[input?.id])
                .startOf('day')
                .format(input?.format || MagicString.DATE_FORMAT.ORACLE_FORMAT)
            )
            return
          }
          form.setValue(`${blockId}.${input?.id}`, infoData[input?.id])
        }
      })
    }
  }

  const pushPksPath = async (dataToSend) => {
    const path = await items.reduce((acc, item) => {
      if (item?.isPk) {
        acc[`${item?.id}.pk`] = dataToSend?.[item?.id]
      }
      return acc
    }, {})

    return path
  }

  const updateResponseWithPks = async (response) => {
    const updatedParams = Object.entries(queryParamsPks).reduce((acc, [key]) => {
      if (Object.prototype.hasOwnProperty.call(response, key)) {
        acc[`${key}.pk`] = isDateFormat(response[key])
      }
      return acc
    }, {})

    const urlParamsPks = new URLSearchParams(updatedParams).toString()

    queryClient.invalidateQueries([`/runtime/${idApplication}/component/${formComponent}`])

    navigation(
      `/applications/dynamicForm/${idForm}/${formComponent}/${idApplication}?itemId=${queryParams.itemId}&${urlParamsPks}`
    )
  }

  const pushSuccess = async (e) => {
    const [response] = e
    if (isEmpty(queryParamsPks)) {
      const restParams = await pushPksPath(response)
      const queryParamsPks = new URLSearchParams(restParams).toString()
      queryClient.invalidateQueries([`/runtime/${idApplication}/component/${formComponent}`])

      navigation(
        `/applications/dynamicForm/${idForm}/${formComponent}/${idApplication}?itemId=${queryParams.itemId}&${queryParamsPks}`
      )
      return
    }
    await updateResponseWithPks(response)
  }

  const { onSubmit, isPendingPushDataForm } = useOnSubmitForm({
    form,
    blockId,
    items,
    queryParamsPks,
    nit_compania,
    pushSuccess,
    companyId,
    formComponent,
    isDirectForm,
    blockEvents,
    relationShips,
    isMasterBlock,
  })

  const { isGetDataEditPending, loadingDataToRQ } = useGetDataEdit({
    processSuccess: importData,
    blockId,
    queryParamsPks,
    companyId,
    formComponent,
    requestType,
    rawQuery,
    isControlBlock,
    isDynamicForm,
    relationShips,
  })

  useEffect(() => {
    if (isControlBlock && location?.pathname.includes('dynamicForm')) {
      navigation(`${location.pathname}?isDirectForm=true`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <FormView
      blockId={blockId}
      newDataDetail={isEmpty(queryParamsPks)}
      items={items}
      form={form}
      queryParamsPks={queryParamsPks}
      isPendingPushDataForm={isPendingPushDataForm}
      onSubmit={onSubmit}
      isGetDataEditPending={isGetDataEditPending}
      loadingDataToRQ={loadingDataToRQ}
      isControlBlock={isControlBlock}
      isDynamicForm={isDynamicForm}
    />
  )
}

export default Form
