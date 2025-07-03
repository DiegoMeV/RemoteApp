import { GenericAlertForm } from '@/app/applications/components'
import { generalForm } from '@/app/applications/constants'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { editFun, useRequestsCriteria } from '../funcs'

import { useNavigate } from 'react-router-dom'

const FormCriteria = ({ infoCriteria, idEdition }) => {
  const navigate = useNavigate()
  const criteriaValues = infoCriteria?.data?.[0] || {}
  const state = infoCriteria?.data?.[0]?.activo === 'N' ? false : true
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: criteriaValues?.nombre,
      activo: state,
      descripcion: criteriaValues?.descripcion,
    },
  })

  const { editCriteria, createCriteria, loadingRequest } = useRequestsCriteria(idEdition)

  const onSubmit = async (data) => {
    await editFun(data, editCriteria, createCriteria, idEdition)
  }
  return (
    <>
      <BackdropLoading loading={loadingRequest} />
      <GenericAlertForm
        inputs={generalForm}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/criteria`)}
      />
    </>
  )
}

export default FormCriteria
