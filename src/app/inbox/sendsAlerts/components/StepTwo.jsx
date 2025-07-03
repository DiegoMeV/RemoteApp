import {
  GenericTable,
  MagicString,
  ValueListGlobal,
  useAssignAlertToProcess,
  useBoolean,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { Button, Grid } from '@mui/material'
import toast from 'react-hot-toast'
import { columnsAlerts, columnsAlertsTSA } from '../constants'

const StepTwo = ({ form, ids }) => {
  const alertsModal = useBoolean()
  const idProcess = ids?.idProcess

  const additionalData = form.watch('additionalData')
  const idModel = additionalData?.modelFilter?.id
  const month = additionalData?.month

  const searchAlertVL = useSearch()

  const { data: alertsInfo, isLoading: isLoadingAlerToProcess } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/alertas/lovAlertas?modeloId=${idModel}&fechaAprobacion=${month}&palabraClave=${searchAlertVL?.searchText}`,
    enabled: alertsModal?.show,
  })

  const {
    data: alertsByProcess,
    isLoading: loadingAlertsByProcess,
    isFetching: fetchingAlertsByProcess,
    refetch: refetchAlertsByProcess,
  } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `alertasProceso?idProceso=${idProcess}&aumentarInfo=true`,
    enabled: !!idProcess,
  })

  const { mutateAsync: assignAlert, isPending: loadingCreation } = useAssignAlertToProcess({
    onSuccess: () => {
      refetchAlertsByProcess()
      toast.success(MagicString.REGISTRY.SUCCESS_SINGLE_ALERT_MESSAGE)
    },
    onError: () => {
      toast.error(MagicString.GENERAL.REQUEST_FAILED_MESSAGE)
    },
  })

  const handleAlertSelection = ({ row }) => {
    assignAlert({ proceso_id: idProcess, alerta_id: row.id, estado: 'PENDIENTE' })
  }

  const toggleDisabled = (params) => {
    const isMatch = alertsByProcess?.data?.find((alert) => {
      return alert?.alerta_id === params?.row?.id || params?.row?.habilitar_boton === 'N'
    })
    return isMatch ? true : false
  }

  return (
    <>
      <Grid
        item
        xs={12}
      >
        <Button
          variant='contained'
          onClick={alertsModal.handleShow}
        >
          Agregar alerta
        </Button>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          maxHeight: 'calc(100vh - 380px)',
          minHeight: '400px',
        }}
      >
        <GenericTable
          columns={columnsAlerts ?? []}
          rows={alertsByProcess?.data ?? []}
          loading={loadingAlertsByProcess || fetchingAlertsByProcess}
        />
      </Grid>
      <ValueListGlobal
        rows={alertsInfo?.data ?? []}
        columns={columnsAlertsTSA}
        loading={isLoadingAlerToProcess || loadingCreation}
        openOptions={alertsModal}
        selectedOption={handleAlertSelection}
        shouldClose={false}
        searchOptions={searchAlertVL}
        toggleDisabled={toggleDisabled}
      />
    </>
  )
}

export default StepTwo
