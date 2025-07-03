import { CustomModal } from '@/libV4'
import { useEffect } from 'react'
import { FormView } from '../formViews'
import { useOnSubmitForm } from '../../hooks'
import { isEmpty, replacePlaceholders } from '@/lib'
import { getInfoData } from '../../funcs'

const ModalFormDetail = ({
  title,
  form,
  queryParamsPks,
  formComponent,
  dataBlock,
  dataRow,
  open,
  handleClose,
  companyId,
  nit_compania,
  getDataEdit,
  getDataToRawQuery,
  blockEvents,
  isControlBlock,
  requestType,
  rawQuery,
  queryParams = {},
  isDynamicForm,
  relationShips,
  isMarterBlock,
}) => {
  const blockId = dataBlock?.blockId
  const items = dataBlock?.items
  useEffect(() => {
    if (!dataRow?.isNew) {
      items?.forEach((input) => {
        if (dataRow?.[input?.id] && dataRow?.[input?.id] !== '') {
          form.setValue(`${blockId}.${input?.id}`, dataRow[input?.id])
        }
      })
    }
  }, [blockId, dataBlock?.id, dataBlock?.items, dataRow, form, items])

  useEffect(() => {
    if (dataRow?.isNew) {
      items?.forEach((input) => {
        if (input?.sourceBlock && input?.sourceItem) {
          if (typeof window.getValueItem === 'function') {
            const valueFromSource = window.getValueItem(input?.sourceBlock, input?.sourceItem)
            if (valueFromSource) {
              form.setValue(`${blockId}.${input?.id}`, valueFromSource)
            }
          }
          return
        }
        if (input.defaultValue !== undefined) {
          form.setValue(`${blockId}.${input.id}`, input.defaultValue ?? null)
        }
      })
    }
  }, [items, form, dataRow, blockId])

  const pushSuccess = async () => {
    if (isEmpty(queryParamsPks) && isControlBlock) {
      handleClose()
      return
    }
    await getInfoData({
      requestType,
      rawQuery,
      replacePlaceholders,
      getDataToRawQuery,
      getDataEdit,
      blockId,
      queryParams,
      relationShips,
      queryParamsPks,
    })

    handleClose()
  }

  const { onSubmit, isPendingPushDataForm } = useOnSubmitForm({
    form,
    blockId,
    items,
    queryParamsPks,
    queryParams,
    nit_compania,
    pushSuccess,
    companyId,
    formComponent,
    isTable: true,
    dataRow: dataRow,
    blockEvents,
    relationShips,
    isMarterBlock,
  })

  return (
    <CustomModal
      title={title}
      size='md'
      open={open}
      handleClose={handleClose}
    >
      <FormView
        blockId={blockId}
        newDataDetail={dataRow?.isNew ?? false}
        isPendingPushDataForm={isPendingPushDataForm}
        onSubmit={onSubmit}
        items={items}
        form={form}
        queryParamsPks={queryParamsPks}
        isDynamicForm={isDynamicForm}
      />
    </CustomModal>
  )
}

export default ModalFormDetail
