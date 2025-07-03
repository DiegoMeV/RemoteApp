import { GenericAlertForm } from '@/app/applications/components'
import { BackdropLoading, useMutationDynamicBaseUrl } from '@/lib'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'

const FormSatellites = ({ satelliteInfo, idEdition }) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()
  const satelliteValues = satelliteInfo?.data?.[0] || {}
  const inputs = [{ name: 'nombre', label: 'Nombre', required: true }]
  const { control, handleSubmit } = useForm({
    defaultValues: {
      nombre: satelliteValues?.nombre,
    },
  })
  const { mutateAsync: updateSatellite, isPending: loadingUpdate } = useMutationDynamicBaseUrl({
    url: idEdition === 'new' ? '/satelite' : `/satelite/${idEdition}`,
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    method: idEdition === 'new' ? 'POST' : 'PUT',
    onSuccess: () => {
      queryClient.invalidateQueries('/satelite')
      if (idEdition === 'new') {
        toast.success('Satélite creado con éxito')
        navigate(`/applications/ubication/satellite`)
      }
      toast.success('Satélite editado con éxito')
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'Ocurrió un error al crear o editar el satélite')
    },
  })
  const onSubmit = async (data) => {
    await updateSatellite({ body: data })
  }

  // const { createRegion, editRegion, loadingUpdate } = useUpdateRequest({ idRegion: idEdition })

  // const onSubmit = async (data) => {
  //   await conditionalRequest(data, editRegion, createRegion, idEdition)
  // }
  return (
    <>
      <BackdropLoading loading={loadingUpdate} />
      <GenericAlertForm
        inputs={inputs}
        control={control}
        submitForm={handleSubmit(onSubmit)}
        onClickCancel={() => navigate(`/applications/ubication/satellite`)}
      />
    </>
  )
}

export default FormSatellites
