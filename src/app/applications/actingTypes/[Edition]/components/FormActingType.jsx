import { GenericAlertForm } from '@/app/applications/components'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { actingForm } from '../constants'

import { useNavigate } from 'react-router-dom'
import { editFuncActingTypes, useRequestsActingType } from '../funcs'

const FormActingType = ({ actingTypes, idEdition }) => {
  const navigate = useNavigate()
  const actingTypesValues = actingTypes?.data?.[0] || {}
  const state = actingTypes?.data?.[0]?.activo === 'N' ? false : true
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: actingTypesValues?.nombre,
      activo: state,
    },
  })

  const { createActingType, editActingType, loadingUpdate } = useRequestsActingType(idEdition)

  const onSubmit = async (data) => {
    await editFuncActingTypes(data, editActingType, createActingType, idEdition)
  }
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={actingForm}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/actionTypes`)}
      />
    </>
  )
}

export default FormActingType
