import { useMemo, useState } from 'react'
import { useComponent, useGetAllParams, useGlobalVaribles } from '@/lib'
import { extractComponentDetails } from './funcs'
import { useForm } from 'react-hook-form'
import { useParams } from 'react-router-dom'
import { ViewFormComponent } from './views'
import { useFormLifecycle, useItemProperties } from './hooks'

const FormComponent = ({ componentProps, componentParams, componentForm }) => {
  const {
    formComponent: paramFormComponent,
    idApplication: paramIdApplication,
    idForm: paramIdForm,
  } = useParams()

  const isUsedInComponent =
    componentProps?.formComponent && componentProps?.idApplication && componentProps?.idForm
  const formComponent = isUsedInComponent ? componentProps?.formComponent : paramFormComponent
  const idApplication = isUsedInComponent ? componentProps?.idApplication : paramIdApplication
  const idForm = isUsedInComponent ? componentProps?.idForm : paramIdForm
  const queryParams = useGetAllParams()
  const getGlobalVariables = useGlobalVaribles()
  const { nit_compania, ...restVariables } = getGlobalVariables({})

  const [newAllParams, setNewAllParams] = useState(queryParams ?? {})
  const [newGlobalVariables, setNewGlobalVariables] = useState(restVariables ?? {})

  const {
    data: dataComponent,
    isLoading,
    isError,
    isSuccess,
  } = useComponent({ id: formComponent, idApplication: idApplication })

  const {
    titleComponent,
    dataBlock,
    endpointMutation,
    isMasterDetail,
    preFormEvent,
    preSubmitEvent,
    postSubmitEvent,
    dbOrigin,
  } = useMemo(() => extractComponentDetails(dataComponent), [dataComponent])

  const queryParamsPks = useMemo(() => {
    return Object.entries(queryParams).reduce((acc, [key, value]) => {
      if (key.includes('.pk')) {
        const newKey = key.replace('.pk', '')
        acc[newKey] = value
      }
      return acc
    }, {})
  }, [queryParams])

  const defaultValues = useMemo(() => {
    if (!dataBlock) return {}
    return dataBlock.reduce((acc, block) => {
      block.items.forEach((item) => {
        acc[`${block.id}.${item.id}`] = item.defaultValue ?? null
      })
      return acc
    }, {})
  }, [dataBlock])

  const form = useForm({
    mode: 'onChange',
    defaultValues,
  })

  const { dataBlockEdit, setDataBlockEdit } = useFormLifecycle({
    form: isUsedInComponent ? componentForm : form,
    dataBlock,
    preFormEvent,
  })

  const {
    setItemProperty,
    getValueItem,
    setValueItem,
    handleOpenModal,
    // Todo: handleCloseModal,
    setBlockProperty,
    // Todo: modalOpen,
    updateParameters,
    getQueryResult,
    getProcedureResult,
    disableBlocks,
    alertMessage,
    updateGlobalVariables,
    formatDate,
    onRowDoubleClick,
    handleAddQueryParams,
    handleCallOracleReport,
  } = useItemProperties({
    setDataBlockEdit,
    form: isUsedInComponent ? componentForm : form,
    setNewAllParams,
    setNewGlobalVariables,
  })

  if (typeof window !== 'undefined') {
    window.setItemProperty = setItemProperty
    window.getValueItem = getValueItem
    window.setValueItem = setValueItem
    window.handleOpenModal = handleOpenModal
    window.updateParameters = updateParameters
    window.allParams = newAllParams
    window.globalVariables = { nit_compania, ...newGlobalVariables }
    window.setBlockProperty = setBlockProperty
    window.getQueryResult = getQueryResult
    window.getProcedureResult = getProcedureResult
    window.disableBlocks = disableBlocks
    window.alertMessage = alertMessage
    window.updateGlobalVariables = updateGlobalVariables
    window.formatDate = formatDate
    window.onRowDoubleClick = onRowDoubleClick
    window.handleAddQueryParams = handleAddQueryParams
    window.handleCallOracleReport = handleCallOracleReport
  }

  const props = {
    titleComponent,
    dataBlock: dataBlockEdit,
    nit_compania,
    endpointMutation,
    isMasterDetail,
    preFormEvent,
    preSubmitEvent,
    postSubmitEvent,
    dbOrigin,
    isLoading,
    isError,
    isSuccess,
    queryParams,
    idApplication,
    idForm,
    form: isUsedInComponent ? componentForm : form,
    queryParamsPks: isUsedInComponent ? componentParams : queryParamsPks,
    formComponent,
  }

  return <ViewFormComponent {...props} />
}

export default FormComponent
