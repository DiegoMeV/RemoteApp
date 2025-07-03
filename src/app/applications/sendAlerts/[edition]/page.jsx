import { useForm } from 'react-hook-form'
import { ViewEditSentAlerts } from './views'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutationDynamicBaseUrl, useQueryDynamicApi } from '@/lib'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { useEffect } from 'react'

const EditSendAlerts = () => {
  const params = useParams()
  const idEdition = params?.idEdition || undefined
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { control, handleSubmit, setValue } = useForm()
  const { data: infoSendAlerts } = useQueryDynamicApi({
    url: `/envios/${idEdition}`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    enabled: idEdition !== 'new',
  })
  const idModelo = infoSendAlerts?.data?.[0]?.id_modelo
  useEffect(() => {
    if (infoSendAlerts) {
      setValue('dep_destino', infoSendAlerts?.data?.[0]?.dep_destino)
      setValue('sigedoc_salida', infoSendAlerts?.data?.[0]?.sigedoc_salida)
      setValue('identificador', infoSendAlerts?.data?.[0]?.identificador)
      setValue('estado', infoSendAlerts?.data?.[0]?.estado === '1' ? true : false)
      setValue('id_modelo', idModelo)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoSendAlerts, setValue])

  const { mutateAsync: updateSents, isPending: loadingUpdateSent } = useMutationDynamicBaseUrl({
    url: idEdition === 'new' ? '/envios' : `/envios/${idEdition}`,
    method: idEdition === 'new' ? 'POST' : 'PUT',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: (response) => {
      toast.success('Se ha actualizado el envío con éxito')
      queryClient.invalidateQueries('/envios')
      {
        idEdition === 'new' && navigate(`/applications/sendAlerts/${response?.data?.id}`)
      }
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })
  const onSubmit = (data) => {
    data.dep_destino = data.dep_destino.id
    data.id_modelo = data.id_modelo.id
    updateSents({ body: data })
  }
  return (
    <ViewEditSentAlerts
      idEdition={idEdition}
      handleSubmit={handleSubmit}
      control={control}
      onSubmit={onSubmit}
      navigate={navigate}
      setValue={setValue}
      loadingUpdateSent={loadingUpdateSent}
      idModelo={idModelo}
    />
  )
}

export default EditSendAlerts
