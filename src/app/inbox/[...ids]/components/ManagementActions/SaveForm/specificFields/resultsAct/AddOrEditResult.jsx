import {
  BackdropLoading,
  GenericForm,
  ValueListGlobal,
  useBoolean,
  useMutationDynamicBaseUrl,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Button, Grid } from '@mui/material'
import React from 'react'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import { columnsAlertsTSA } from './constants'
import { inputsAddOrEdit } from './funcs'

const AddOrEditResult = ({
  idProcess,
  idActivity,
  idAlert,
  rowParams,
  setRowParams,
  handleClose,
  refetchResultAct,
  handleShowTransfer,
}) => {
  const isNewResult = rowParams?.isNew ?? false
  const { data: alertInfo } = useQueryDynamicApi({
    url: `/alertas/${idAlert}`,
    baseKey: 'urlCgr',
    isCompanyRequest: true,
    enabled: !!idAlert,
  })

  const alertIdentifier = alertInfo?.data?.[0]?.identificador

  const form = useForm({
    defaultValues: {
      resultType: rowParams?.tipoResultadoInfo,
      alert: rowParams?.dataAlerta,
      es_insumo: rowParams?.es_insumo,
      description: rowParams?.descripcion,
    },
  })

  const modalAlerts = useBoolean()
  const searchAlertByProcess = useSearch()

  const { data: Alerts, isLoading: loadingAlerts } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/alertas/lovAlertas?palabraClave=${searchAlertByProcess?.searchText}`,
    enabled: modalAlerts?.show || searchAlertByProcess?.searchText > 1,
  })

  const modalResultType = useBoolean()
  const searchResultType = useSearch()

  const { data: resultTypesInfo, isLoading: loadingResultsTypeInfo } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `tipoResultado?activo=true&palabraClave=${searchResultType?.searchText}`,
  })

  const { mutateAsync: updateResult, isPending: pendingUpdateResult } = useMutationDynamicBaseUrl({
    url: '/resultadoActuacion',
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    onSuccess: (response) => {
      setRowParams(response?.data)
      refetchResultAct?.()
    },
    onError: (e) => {
      toast.error(e?.response?.data?.error || 'ha ocurrido un error')
    },
  })

  const inputs = inputsAddOrEdit(
    resultTypesInfo,
    loadingResultsTypeInfo,
    modalResultType,
    searchResultType,
    isNewResult,
    alertIdentifier
  )

  const modals = [
    {
      title: 'Alertas por proceso',
      openOptions: modalAlerts,
      columns: columnsAlertsTSA,
      rows: Alerts?.data ?? [],
      loading: loadingAlerts,
      searchOptions: searchAlertByProcess,
      name: 'alert',
    },
    {
      title: 'Tipo de resultado',
      openOptions: modalResultType,
      columns: [
        {
          field: 'nombre',
          headerName: 'Nombre',
          flex: 1,
        },
      ],
      rows: resultTypesInfo?.data ?? [],
      loading: loadingResultsTypeInfo,
      searchOptions: searchResultType,
      name: 'resultType',
    },
  ]

  const selectVL = (name, newValue) => {
    form.setValue(name, newValue)
  }

  const selectModal = modals.find((modal) => !!modal.openOptions?.show)

  const onSubmit = (data) => {
    const body = isNewResult
      ? {
          id_process: idProcess,
          id_activity: idActivity,
          id_tipo_resultado: data?.resultType?.id,
          id_alerta: idAlert,
          es_insumo: data.es_insumo,
          descripcion: data.description,
        }
      : {
          es_insumo: data.es_insumo,
          descripcion: data.description,
        }

    const methodBody = isNewResult ? 'post' : 'put'

    const qry = isNewResult ? '' : `/${rowParams?.id}`

    updateResult({
      qry,
      body,
      methodBody,
    })
  }

  const onError = () => {}

  const isInsumo = form.watch('es_insumo')

  return (
    <Grid
      container
      spacing={2}
      component='form'
      onSubmit={form.handleSubmit(onSubmit, onError)}
    >
      <BackdropLoading loading={pendingUpdateResult} />
      <GenericForm
        inputs={inputs}
        control={form.control}
      />
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          columnGap: 2,
        }}
      >
        {!isNewResult && isInsumo && (
          <Button
            variant='contained'
            onClick={handleShowTransfer}
          >
            Trasladar
          </Button>
        )}
        <Button
          variant='contained'
          color='error'
          onClick={handleClose}
        >
          Cancelar
        </Button>
        <Button
          variant='contained'
          type='submit'
        >
          Guardar
        </Button>
      </Grid>
      <ValueListGlobal
        {...selectModal}
        selectedOption={({ row }) => selectVL(selectModal?.name, row)}
      />
    </Grid>
  )
}

export default AddOrEditResult
