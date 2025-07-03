import { GenericAlertForm } from '@/app/applications/components'
import { generalForm, typeDomain } from '@/app/applications/constants'
import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { editFun, useRequestsDomain } from '../funcs'
import { useNavigate } from 'react-router-dom'

const FormDomain = ({ infoDomain, subPage, idEdition }) => {
  const navigate = useNavigate()
  const domainValues = infoDomain?.data?.[0] || {}
  const state = infoDomain?.data?.[0]?.activo === 'N' ? false : true
  const type = typeDomain[subPage] || ''
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: domainValues?.nombre,
      activo: state,
      descripcion: domainValues?.descripcion,
    },
  })

  const { editDomain, createDomain, loadingRequest } = useRequestsDomain(idEdition, subPage)

  const onSubmit = async (data) => {
    await editFun(data, editDomain, createDomain, idEdition, type)
  }
  return (
    <>
      <BackdropLoading loading={loadingRequest} />
      <GenericAlertForm
        inputs={generalForm}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/domains/${subPage}`)}
      />
    </>
  )
}

export default FormDomain
