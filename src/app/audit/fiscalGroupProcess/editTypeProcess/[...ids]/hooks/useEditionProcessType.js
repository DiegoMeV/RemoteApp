import { useState } from 'react'
import { useForm } from 'react-hook-form'
import useActionsProcessType from './useActionsProcessType'

const useEditionProcessType = (dataProcessType, isNew, idGroup) => {
  const initialData =
    dataProcessType?.typeSpecs?.additionalData?.length > 0
      ? dataProcessType?.typeSpecs?.additionalData?.reduce((acc, item) => {
          const id = crypto.randomUUID()
          acc[id] = item
          return acc
        }, {})
      : []

  const [variablesProcessType, setVariablesProcessType] = useState(
    initialData ? Object.keys(initialData).map((id) => ({ id: id })) : []
  )
  const { createProcessType, editProcessType, loadingPT } = useActionsProcessType({
    idProcessType: dataProcessType?.id,
    idGroup: idGroup,
  })

  const ProcessTypesForm = useForm({
    defaultValues: {
      name: dataProcessType?.name,
      numberStructure: dataProcessType?.numberStructure,
      isEnabled: dataProcessType?.isEnabled,
      description: dataProcessType?.description,
      numByTime: dataProcessType?.numByTime,
      numByOrigin: dataProcessType?.numByOrigin,
      duration: dataProcessType?.duration,
      durationUnit: dataProcessType?.durationUnit,
      numByLevel: dataProcessType?.numByLevel,
      dataSourceType: dataProcessType?.dataSourceType,
      typeSpecs: { additionalData: initialData },
    },
  })

  const addVariable = () => {
    setVariablesProcessType([...variablesProcessType, { id: crypto.randomUUID() }])
  }
  const deleteVariable = (id) => {
    setVariablesProcessType(variablesProcessType.filter((item) => item.id !== id))
    ProcessTypesForm.unregister(`typeSpecs.additionalData.${id}`)
  }
  const onSubmit = async (data) => {
    const additionalData = data?.typeSpecs?.additionalData
      ? Object.values(data?.typeSpecs?.additionalData)
      : []

    if (isNew) {
      await createProcessType({
        idGroup: idGroup,
        ...data,
        typeSpecs: { additionalData: additionalData },
      })
    } else {
      await editProcessType({
        idGroup: dataProcessType?.idGroup,
        ...data,
        typeSpecs: { additionalData: additionalData },
      })
    }
  }
  return {
    variablesProcessType,
    ProcessTypesForm,
    loadingPT,
    addVariable,
    deleteVariable,
    onSubmit,
  }
}

export default useEditionProcessType
