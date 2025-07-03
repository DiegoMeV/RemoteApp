import { GenericAlertForm } from '@/app/applications/components'

import { BackdropLoading } from '@/lib'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { conditionalRequest, useUpdateRequest } from '../funcs'

const FormRegion = ({ infoRegion, idEdition }) => {
  const navigate = useNavigate()
  const regionValues = infoRegion?.data?.[0] || {}

  const inputs = [{ name: 'nombre', label: 'Nombre', required: true }]

  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: regionValues?.nombre,
    },
  })

  const { createRegion, editRegion, loadingUpdate } = useUpdateRequest({ idRegion: idEdition })

  const onSubmit = async (data) => {
    await conditionalRequest(data, editRegion, createRegion, idEdition)
  }
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={inputs}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/ubication/regions`)}
      />
    </>
  )
}

export default FormRegion
