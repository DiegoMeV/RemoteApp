import { safeExecute } from '@/lib'
import { useCallback, useEffect } from 'react'

const useCollectFormData = ({
  autoCompleteConfig,
  globalVariables,
  form,
  rowId,
  modalAutocompleteDinamicList,
  getDataLOV,
  value,
  blockId,
  url_data_source,
  items,
  model,
  setModel,
  newDataDetail,
  search,
  event,
  typeEvent,
}) => {
  const getTypeValue = useCallback(
    (key) => {
      if (!key) return null

      const [typeValue, keyName] = key.split('.')

      const lookup = {
        global: globalVariables?.[keyName],
        parameter: window.allParams?.[keyName],
      }

      return lookup[typeValue] ?? window.getValueItem?.(key) ?? null
    },
    [globalVariables]
  )

  const collectFormData = useCallback(async () => {
    const getValueInputs = await autoCompleteConfig?.params?.reduce(
      (acc, { key, defaultValue }) => {
        const [itemBlockId, itemId] = key.split('.')
        const ellValue = getTypeValue(key)
        const formValue = form.watch(rowId ? `${itemBlockId}.${rowId}.${itemId}` : key)

        if (key === 'page' && model?.page) {
          acc[key] = `${model?.page}`
        } else {
          acc[key] =
            defaultValue !== undefined && defaultValue !== null
              ? defaultValue
              : ellValue !== undefined && ellValue !== null
              ? ellValue
              : formValue
              ? formValue
              : null
        }

        return acc
      },
      {}
    )

    return getValueInputs
  }, [autoCompleteConfig?.params, getTypeValue, form, rowId, model])

  const handleClickOpenLov = useCallback(async () => {
    modalAutocompleteDinamicList.handleShow()

    const body = await collectFormData()
    await getDataLOV({ body: { ...body, busqueda: '%' } })
  }, [collectFormData, getDataLOV, modalAutocompleteDinamicList])

  const handleSearch = useCallback(
    async (search) => {
      const body = await collectFormData()
      await getDataLOV({
        body: { ...body, busqueda: search?.trim() !== '' ? search : '%' },
      })
    },
    [collectFormData, getDataLOV]
  )

  const handleClickOpenLovEdit = useCallback(async () => {
    const body = await collectFormData()
    await getDataLOV({ body: { ...body, busqueda: '%' } })
  }, [collectFormData, getDataLOV])

  const convertValue = useCallback(
    (key, value) => {
      const getItem = key?.split('.').pop()
      const findItem = items?.find((item) => item?.id === getItem)

      const typeHandlers = {
        text: () => `${value}`,
        integer: () => ++value,
        boolean: () => Boolean(value),
      }

      return typeHandlers[findItem?.elementType]?.() ?? value
    },
    [items]
  )

  const selectedOption = useCallback(
    (params) => {
      const selectedValue = (params?.row || params) ?? null
      if (url_data_source) {
        autoCompleteConfig?.setter?.forEach((setter) => {
          const key = rowId
            ? `${blockId}.${rowId}.${setter?.setKey}`
            : `${blockId}.${setter?.setKey}`
          const valueConverter = convertValue(key, selectedValue?.[setter?.getKey]) ?? null

          form.setValue(key, valueConverter)
        }) // Hay que aumentar el bloque en lo setter cuando es synchrox (BE)
        return
      }

      autoCompleteConfig?.setter?.forEach((setter) => {
        const [newBlockId, newRowId] = setter?.setKey?.split('.') || []
        const key = rowId ? `${newBlockId}.${rowId}.${newRowId}` : setter?.setKey
        const valueConverter = convertValue(key, selectedValue?.[setter?.getKey]) ?? null
        form.setValue(key, valueConverter)
      })
      if (event && typeEvent === 'onChange') {
        safeExecute(event)
      }
    },
    [
      autoCompleteConfig?.setter,
      blockId,
      convertValue,
      form,
      rowId,
      url_data_source,
      event,
      typeEvent,
    ]
  )

  const handlePaginationModelChange = async (newModel) => {
    setModel(newModel)
    const body = await collectFormData()
    await getDataLOV({
      body: {
        ...body,
        page: newModel.page + 1,
        busqueda: search?.searchText.trim() !== '' ? search.searchText : '%',
      },
    })
  }

  useEffect(() => {
    if (!newDataDetail && value && value !== '' && !value?.[autoCompleteConfig?.valueOption]) {
      handleClickOpenLovEdit()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    collectFormData,
    handleClickOpenLov,
    handleClickOpenLovEdit,
    selectedOption,
    handlePaginationModelChange,
    handleSearch,
  }
}

export default useCollectFormData
