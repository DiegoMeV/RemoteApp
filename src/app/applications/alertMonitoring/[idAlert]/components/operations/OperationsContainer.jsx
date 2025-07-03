import {
  BackdropLoading,
  CustomAccordion,
  CustomModal,
  MagicString,
  useBoolean,
  useMutationDynamicBaseUrl,
  usePrivileges,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import columnsOperations from './constant/columnsOperations'
import { ModalOperation, TableOperationContent } from '.'
import { useForm } from 'react-hook-form'
import dayjs from 'dayjs'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import { defaultValuesNames } from './constant'

const OperationsContainer = ({ idAlert }) => {
  // TODO: Pasar a hooks
  const hasPrivilege = usePrivileges('cgr.alertas.editar_actuaciones')

  const [infoOperation, setInfoOperation] = useState(defaultValuesNames)

  const handleOpenModal = (row) => {
    setInfoOperation(row)
    modalOperation?.handleShow()
  }

  const { columns } = columnsOperations(handleOpenModal, hasPrivilege)

  const { data: rows, isFetching } = useQueryDynamicApi({
    url: `/actuacionesAlerta?idAlerta=${idAlert}&isSeguimiento=true`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
  })

  const queryClient = useQueryClient()

  const searchOperation = useSearch()

  const modalOperation = useBoolean()

  const { control, handleSubmit, setValue, getValues, watch } = useForm({
    defaultValues: defaultValuesNames,
  })

  const actingType = watch('id_tipo_actuacion')

  useEffect(() => {
    //TODO: Cambiar esta forma, la mejor forma es operar el useForm dentro del componente: ModalOperation
    //La mejor forma es solo pasarle al defaultValues del formulario el infoOperation, nada mas
    const fieldMappings = {
      dependency: 'dataDependencia',
      id_tipo_actuacion: 'dataTipoActuacion',
      otra_actuacion: 'otra_actuacion',
      fecha_inicio: 'fecha_inicio',
      fecha_final: 'fecha_final',
      identificacion_actuacion: 'identificacion_actuacion',
      aplicativo: 'aplicativo',
      resultado: 'resultado',
      cantidad_hallazgos_fiscaliza: 'cantidad_hallazgos_fiscaliza',
      valor_hallazgos_fiscaliza: 'valor_hallazgos_fiscaliza',
      cantidad_ordenes_ip: 'cantidad_ordenes_ip',
      valor_ip: 'valor_ip',
      valor_beneficio_fiscal: 'valor_beneficio_fiscal',
    }

    Object.keys(fieldMappings).forEach((field) => {
      const infoKey = fieldMappings[field]
      setValue(field, infoOperation?.[infoKey] ?? '')
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoOperation])

  useEffect(() => {
    if (modalOperation?.show) return
    setInfoOperation({})
  }, [modalOperation?.show])

  const onSubmit = (data) => {
    const dataForm = { ...data }
    delete dataForm.dependency
    const fechaInicio = dayjs(data.fecha_inicio).format('YYYY-MM-DD HH:mm:ss')
    const fechaFinal = dayjs(data.fecha_final).format('YYYY-MM-DD HH:mm:ss')

    const formData = {
      ...dataForm,
      id_alerta: idAlert,
      id_dependencia: data.dependency.id,
      id_tipo_actuacion: data.id_tipo_actuacion.id,
      fecha_inicio: fechaInicio,
      fecha_final: fechaFinal,
    }

    if (infoOperation?.id) {
      sendOperation({ qry: `/${infoOperation?.id}`, methodBody: 'put', body: formData })
      return
    }
    sendOperation({ body: formData })
  }

  const modalActions = [
    {
      label: MagicString.GENERAL.CANCEL_TITLE,
      color: 'error',
      onClick: () => {
        setInfoOperation({})
        modalOperation?.handleShow()
      },
    },
    {
      label: MagicString.GENERAL.SAVE_TITLE,
      type: 'submit',
    },
  ]

  const { mutateAsync: sendOperation, isPending: loadingSent } = useMutationDynamicBaseUrl({
    url: `/actuacionesAlerta`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    onSuccess: () => {
      queryClient.invalidateQueries([`/actuacionesAlerta?idAlerta=${idAlert}`])
      setInfoOperation({})
      modalOperation?.handleShow()
    },
    onError: (error) => {
      toast.error(error?.response?.data?.message ?? 'Error al crear')
    },
  })

  return (
    <CustomAccordion
      defaultExpanded={true}
      title='Actuaciones'
      color='primary'
    >
      <BackdropLoading loading={loadingSent} />
      <TableOperationContent
        columns={columns}
        searchOperation={searchOperation}
        modalOperation={modalOperation}
        isLoading={isFetching}
        rows={rows}
      />
      {modalOperation?.show && (
        <CustomModal
          open={modalOperation?.show}
          handleClose={modalOperation?.handleShow}
          title={'Formulario Actuaciones'}
          size='lg'
          modalType='form'
          onSubmit={handleSubmit(onSubmit)}
          actions={modalActions}
        >
          <ModalOperation
            setValue={setValue}
            control={control}
            getValues={getValues}
            infoOperation={infoOperation}
            setActingTypes={() => {}}
            actingType={actingType}
          />
        </CustomModal>
      )}
    </CustomAccordion>
  )
}

export default OperationsContainer
