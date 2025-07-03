import { GenericAlertForm } from '@/app/applications/components'

import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { conditionalRequest, formVariable, useUpdateRequest } from '../funcs'
import { useEffect } from 'react'

const FormVariablesContract = ({ infoVariables, idEdition }) => {
  const navigate = useNavigate()
  const { control, handleSubmit, watch, setValue } = useForm()

  useEffect(() => {
    const variableValues = infoVariables?.data?.[0] || {}
    setValue('nombre', variableValues?.nombre)
    setValue('titulo', variableValues?.titulo)
    setValue('tipo', variableValues?.tipo)
    setValue('dominio', variableValues?.dominio)
    setValue('descripcion', variableValues?.descripcion)
    setValue('requerido', variableValues?.requerido)
    setValue('activo', variableValues?.activo)
  }, [infoVariables, setValue])

  const selectValueType = watch('tipo')

  const { createVariable, editVariable, loadingUpdate } = useUpdateRequest({
    idVariable: idEdition,
  })

  const onSubmit = async (data) => {
    const body = { ...data, categoria: 'CONTRATO' }
    await conditionalRequest(body, editVariable, createVariable, idEdition)
  }
  const formVariableInputs = formVariable({ selectValueType })
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={formVariableInputs}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/variablesContract`)}
      />
    </>
  )
}

export default FormVariablesContract
