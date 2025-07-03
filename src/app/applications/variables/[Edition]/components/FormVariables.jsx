import { GenericAlertForm } from '@/app/applications/components'

import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { conditionalRequest, formVariable, useUpdateRequest } from '../funcs'

const FormVariables = ({ infoVariables, idEdition }) => {
  const navigate = useNavigate()
  const variableValues = infoVariables?.data?.[0] || {}
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      nombre: variableValues?.nombre,
      titulo: variableValues?.titulo,
      tipo: variableValues?.tipo,
      dominio: variableValues?.dominio,
      descripcion: variableValues?.descripcion,
      activo: variableValues?.activo,
    },
  })
  const selectValueType = watch('tipo')

  const { createVariable, editVariable, loadingUpdate } = useUpdateRequest({
    idVariable: idEdition,
  })

  const onSubmit = async (data) => {
    const body = { ...data, requerido: false, categoria: 'BLOQUE' }
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
        onClickCancel={() => navigate(`/applications/variables`)}
      />
    </>
  )
}

export default FormVariables
