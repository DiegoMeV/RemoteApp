import { GenericAlertForm } from '@/app/applications/components'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { resultForm } from '../constants'

import { useNavigate } from 'react-router-dom'
import { editFuncResultTypes, useRequestResultType } from '../funcs'

const FormResultType = ({ resultTypeInfo, idEdition }) => {
  const navigate = useNavigate()
  const resultTypesValues = resultTypeInfo?.data?.[0] || {}
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: resultTypesValues?.nombre,
      activo: resultTypesValues?.activo,
    },
  })

  const { createResultType, editResultType, loadingUpdate } = useRequestResultType(idEdition)

  const onSubmit = async (data) => {
    await editFuncResultTypes(data, editResultType, createResultType, idEdition)
  }
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={resultForm}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/resultTypes`)}
      />
    </>
  )
}

export default FormResultType
