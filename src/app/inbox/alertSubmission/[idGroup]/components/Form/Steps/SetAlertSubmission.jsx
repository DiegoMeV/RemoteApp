import {
  FormGenericContainer,
  FormGenericHeader,
} from '@/app/inbox/requirements/[idGroup]/components'
import { Box } from '@mui/material'
import { ContentAlerts, FormBtnAlertSubmission, ModalTableAlerts } from './components'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import {
  CustomModal,
  ValueListGlobal,
  resizeColumns,
  toArray,
  useAssignAlertToProcess,
  useBoolean,
  useProcessTypeById,
  useQueryDynamicApi,
  useSearch,
} from '@/lib'
import { columnsAlerts, normalizeText } from './funcs'
import { MagicString } from '@/lib'
import { useEffect, useState } from 'react'
import { useGridApiRef } from '@mui/x-data-grid-premium'

const SetAlertSubmission = ({
  stepVars,
  selectVars,
  idProcess,
  alertsByProcess,
  loadingAlertsByProcess,
  fetchingAlertsByProcess,
  refetchAlertsByProcess,
  searchAlertByProcess,
}) => {
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
  const { step: currentStep, setActiveStep: setStep } = stepVars
  const { stepSelect, stepAlert, setStepAlert } = selectVars
  const idProcessType = stepSelect?.processType?.id
  const { data: infoProcessType } = useProcessTypeById({ idProcessType })
  const idModel = infoProcessType?.data?.[0]?.typeSpecs?.idModeloAlerta
  const modalAlerts = useBoolean()
  const { handleSubmit } = useForm({
    defaultValues: {
      alerts: toArray(stepAlert) ?? [],
    },
  })

  const processTypeName = normalizeText(stepSelect?.processType?.name)
  const searchAlerts = useSearch()
  const { data: alertsInfo, isLoading: isLoadingAlerToProcess } = useQueryDynamicApi({
    isCompanyRequest: true,
    baseKey: 'urlCgr',
    url: `/alertas/lovAlertas/?modeloId=${idModel}&estado=NUEVA,PENDIENTE&tipo=${
      processTypeName ?? ''
    }&palabraClave=${searchAlerts?.searchText}`,
    enabled: modalAlerts?.show,
  })

  const openRegistryAlert = useBoolean()
  const [modalInfo, setModalInfo] = useState({ view: '', additionalData: '' })

  const onSubmit = (data) => {
    if (alertsByProcess?.data?.length === 0) {
      toast.error(MagicString.REGISTRY.VALIDATION_DELETE_ALERT)
      return
    }
    setStep((prev) => prev + 1)
    setStepAlert(data?.alerts ?? [])
    toast.success(MagicString.REGISTRY.SUCCESS_ALERT_MESSAGE)
  }

  const apiRefExternal = useGridApiRef()
  const handleClose = () => {
    setModalInfo({ view: '', additionalData: '' })
    openRegistryAlert.handleShow()
  }
  useEffect(() => {
    resizeColumns(apiRefExternal, loadingAlertsByProcess)
  }, [alertsByProcess?.data, apiRefExternal, loadingAlertsByProcess, openRegistryAlert])

  const handleSetAlertToProcess = (response) => {
    // const findAlert = findEquivalentAlert(response)
    if (!!response?.success && modalInfo?.view === 'new') {
      assignAlert({
        proceso_id: idProcess,
        alerta_id: response?.data?.id,
        estado: 'PENDIENTE',
      })
      handleClose()
    } else {
      refetchAlertsByProcess()
    }
  }

  const handleOpenCreationAlert = () => {
    setModalInfo({ view: 'new', additionalData: 'new' })
    openRegistryAlert.handleShow()
  }

  const handleOpenEditAlert = (id) => {
    setModalInfo({ view: 'edit', additionalData: id })
    openRegistryAlert.handleShow()
  }
  const toggleDisabled = (params) => {
    const isMatch = alertsByProcess?.data?.find((alert) => {
      return alert?.alerta_id === params?.row?.id || params?.row?.habilitar_boton === 'N'
    })
    return isMatch ? true : false
  }

  return (
    <Box sx={{ height: '100%' }}>
      <FormGenericHeader title='Alertas vinculadas' />
      <FormGenericContainer
        type={openRegistryAlert?.show ? 'div' : 'form'}
        onSubmit={openRegistryAlert?.show ? () => {} : handleSubmit(onSubmit)}
        currentStep={currentStep}
        setStep={setStep}
        styleChild={{ px: 0 }}
      >
        <FormBtnAlertSubmission
          handleOpen={handleOpenCreationAlert}
          modalAlerts={modalAlerts}
        />
        <ContentAlerts
          handleOpenEditAlert={handleOpenEditAlert}
          alertsByProcess={alertsByProcess?.data ?? []}
          loadingAlertsByProcess={
            fetchingAlertsByProcess || loadingCreation || loadingAlertsByProcess
          }
          apiRefExternal={apiRefExternal}
          searchAlertByProcess={searchAlertByProcess}
        />
        {modalAlerts?.show && (
          <ValueListGlobal
            title='Alertas'
            loading={isLoadingAlerToProcess || fetchingAlertsByProcess || loadingCreation}
            openOptions={modalAlerts}
            columns={columnsAlerts}
            rows={alertsInfo?.data ?? []}
            searchOptions={searchAlerts}
            selectedOption={handleAlertSelection}
            toggleDisabled={toggleDisabled}
            shouldClose={false}
          />
        )}
        {openRegistryAlert?.show && modalInfo?.view && (
          <CustomModal
            open={openRegistryAlert.show}
            handleClose={handleClose}
            height='calc(100vh - 150px)'
            title='Registro de alertas'
            size='lg'
          >
            <ModalTableAlerts
              modalInfo={modalInfo}
              handleClose={handleClose}
              handleSetAlertToProcess={handleSetAlertToProcess}
            />
          </CustomModal>
        )}
      </FormGenericContainer>
    </Box>
  )
}

export default SetAlertSubmission
