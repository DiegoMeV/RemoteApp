import { isEmpty, safeExecute } from '@/lib'
import usePushDataForm from './usePushDataForm'
import { parseDefaultValue, partitionData, processInputs } from '../funcs'

const useOnSubmitForm = ({
  form,
  blockId,
  items = [],
  queryParamsPks,
  queryParams,
  nit_compania,
  pushSuccess,
  companyId,
  formComponent,
  isTable = false,
  dataRow = null,
  isDirectForm = false,
  blockEvents = [],
  relationShips = [],
  isMarterBlock,
}) => {
  const { pushDataForm, isPendingPushDataForm } = usePushDataForm({
    pushSuccess,
    companyId,
    formComponent,
    queryParamsPks,
    dataRow,
    isDirectForm,
  })
  const preInsertEvent = blockEvents?.find((event) => event?.eventType === 'preInsert')?.code
  const onSubmit = async () => {
    const isFormValid = await form.trigger([blockId])
    if (!isFormValid) return

    const formData = form.getValues(blockId)

    const processedItems = items?.filter((item) => {
      const hasIsFromDB = Object.prototype.hasOwnProperty.call(item, 'isFromDB')
      const itemIsFromDBStatus = hasIsFromDB && item?.isFromDB === false ? false : true
      const isNotButton = item?.elementType !== 'button'

      return itemIsFromDBStatus && isNotButton
    })
    const filteredInputs = processInputs(formData, processedItems)
    const combinedInputs = { ...filteredInputs, ...queryParams }
    const { dataEdit, dataPks } = partitionData(processedItems, combinedInputs)
    const isNitCompanyInItems = Object.prototype.hasOwnProperty.call(dataPks, 'nit_compania')

    const editPayload = {
      [blockId]: {
        where: {
          ...(isMarterBlock && queryParamsPks),
          ...dataPks,
          ...queryParams,
          ...(isNitCompanyInItems ? { nit_compania } : {}),
        },
        data: dataEdit,
      },
    }

    const filterDefaultValue = processedItems?.reduce((acc, item) => {
      if (item?.defaultValue) {
        acc[item?.id] = parseDefaultValue(item?.dataType, item?.defaultValue)
      }
      return acc
    }, {})

    const validatedQueryParamsPks = Object.entries(queryParamsPks).reduce((acc, [key, value]) => {
      const item = processedItems.find((item) => item.id === key)
      if (item?.dataType === 'NUMBER') {
        acc[key] = Number(value)
      } else {
        acc[key] = value
      }
      return acc
    }, {})

    const usedBlockItemIds = relationShips.map((r) => r.blockItemId)

    const filteredValidatedQueryParamsPks = Object.fromEntries(
      Object.entries(validatedQueryParamsPks).filter(([key]) => !usedBlockItemIds.includes(key))
    )

    const hasNitCompania = processedItems?.some((item) => item?.id === 'nit_compania')
    const dataToSend = isTable
      ? dataRow?.isNew
        ? {
            blockId,
            data: {
              ...filterDefaultValue,
              ...combinedInputs,
              ...dataPks,
              ...(isMarterBlock && filteredValidatedQueryParamsPks),
              ...(hasNitCompania ? { nit_compania } : {}),
            },
          }
        : editPayload
      : isEmpty(queryParamsPks) && !isDirectForm
      ? {
          blockId,
          data: {
            ...filterDefaultValue,
            ...filteredInputs,
            ...(hasNitCompania ? { nit_compania } : {}),
          },
        }
      : editPayload

    try {
      let responseSafeExecute = null
      if (preInsertEvent) {
        responseSafeExecute = await safeExecute(preInsertEvent, { dataToSend })
      }

      const newDataToSend = {
        ...(dataToSend || {}),
        data: {
          ...(dataToSend.data || {}),
          ...(responseSafeExecute?.addData || {}),
        },
      }

      await pushDataForm({ body: newDataToSend })
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return {
    onSubmit,
    isPendingPushDataForm,
  }
}

export default useOnSubmitForm
